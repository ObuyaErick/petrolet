import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export enum PaystackCurrency {
  NGN = 'NGN',
  USD = 'USD',
  GHS = 'GHS',
  ZAR = 'ZAR',
  KES = 'KES',
}

export interface InitializePaystackTransactionPayload {
  email: string;
  amount: string;
  currency?: PaystackCurrency;
  reference?: string;
  callback_url?: string;
  plan?: string;
  invoice_limit?: number;
  metadata?: string;
  channels?: (
    | 'card'
    | 'bank'
    | 'ussd'
    | 'qr'
    | 'mobile_money'
    | 'bank_transfer'
    | 'eft'
  )[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: any;
  meta?: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

export interface PaystackInitializedTrxData extends PaystackResponse {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export class InitializePaystackTransactionDto {
  @IsNotEmpty({ message: 'Wedding ID is required.' })
  weddingId: string;

  @IsEmail({}, { message: 'a valid email is required' })
  email: string;

  @IsNotEmpty({ message: 'Amount is required.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  @Min(1, { message: 'Amount must be greater than zero.' })
  amount: string;

  @IsEnum(PaystackCurrency)
  currency: PaystackCurrency;
}

export const PaystackWebhookEvents = {
  'charge.dispute.create':
    'A dispute has been raised against your transaction.',
  'charge.dispute.remind': 'A dispute is still unresolved. Please take action.',
  'charge.dispute.resolve': 'A previously raised dispute has been resolved.',
  'charge.success': 'Payment was successful.',
  'customeridentification.failed': 'Customer ID verification failed.',
  'customeridentification.success':
    'Customer ID has been successfully verified.',
  'dedicatedaccount.assign.failed':
    'We could not assign a dedicated virtual account to the customer.',
  'dedicatedaccount.assign.success':
    'A dedicated virtual account has been successfully assigned to the customer.',
  'invoice.create': 'A new invoice has been created.',
  'invoice.payment_failed': 'Payment attempt for the invoice failed.',
  'invoice.update':
    'An invoice has been updated. Please review it for changes.',
  'paymentrequest.pending': 'A payment request has been sent to the customer.',
  'paymentrequest.success': 'A payment request has been completed.',
  'refund.failed':
    'Refund failed. The refund amount will be returned to your account.',
  'refund.pending':
    'Refund has been initiated and is awaiting processor response.',
  'refund.processed': 'Refund has been successfully processed.',
  'refund.processing':
    'Refund has been received by the processor and is in progress.',
  'subscription.create': 'A new subscription has been created.',
  'subscription.disable': 'A subscription has been disabled.',
  'subscription.expiring_cards':
    'Some subscriptions have cards expiring this month.',
  'subscription.not_renew':
    'A subscription has been set to not renew automatically.',
  'transfer.failed': 'A transfer attempt has failed.',
  'transfer.success': 'A transfer has been completed successfully.',
  'transfer.reversed': 'A transfer has been reversed.',
} as const;

export type PaystackEvent = keyof typeof PaystackWebhookEvents;

export const PaystackTransactionStates = {
  abandoned: 'Transaction was not completed by the customer.',
  failed:
    'Transaction failed. Please check the failure reason for more details.',
  ongoing: 'Customer is in the process of completing the transaction.',
  pending: 'Transaction is currently in progress.',
  processing: 'Transaction is being processed (direct debit in progress).',
  queued: 'Transaction has been queued for processing (bulk charge).',
  reversed: 'Transaction was reversed or refunded.',
  success: 'Transaction was completed successfully.',
} as const;

export type PaystackTransactionState = keyof typeof PaystackTransactionStates;

export interface PaystackWebhookPayload {
  event: PaystackEvent;
  data: any;
}

export enum MobileMoneyProvider {
  mtn = 'mtn',
  atl = 'atl',
  vod = 'vod',
  mpesa = 'mpesa',
  mptill = 'mptill',
}

export class BankChannelDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'account number is required' })
  account_number: string;
}

export class UssdChannelDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(737|919|822|966)$/, {
    message:
      'USSD type must be one of 737 (GTB), 919 (UBA), 822 (Sterling), or 966 (Zenith)',
  })
  type: string;
}

@ValidatorConstraint({
  name: 'paystackChargeMobileMoneyPhoneNumberValidator',
  async: false,
})
class PaystackChargeMobileMoneyPhoneNumberValidator
  implements ValidatorConstraintInterface
{
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (
      (validationArguments?.object as MobileMoneyChannelDto)?.provider ===
      MobileMoneyProvider.mpesa
    ) {
      return /^\+?254[17]\d{8}$/.test(value);
    }
    return /^\d+$/.test(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    if (
      (validationArguments?.object as MobileMoneyChannelDto)?.provider ===
      MobileMoneyProvider.mpesa
    ) {
      return 'phone should be a valid Safaricom number with country code (e.g., +254722000000)';
    }

    return 'phone should contain digits only';
  }
}

export class MobileMoneyChannelDto {
  @ValidateIf((o) => o.provider !== MobileMoneyProvider.mptill)
  @IsString()
  @IsNotEmpty()
  @Validate(PaystackChargeMobileMoneyPhoneNumberValidator)
  phone?: string;

  @ValidateIf((o) => o.provider === MobileMoneyProvider.mptill)
  @IsString()
  @IsNotEmpty()
  account?: string;

  @IsEnum(MobileMoneyProvider)
  @IsNotEmpty()
  provider: MobileMoneyProvider;
}

export enum PaystackPaymentChannel {
  mobile_money = 'mobile_money',
  bank = 'bank',
  ussd = 'ussd',
}

export class CreateChargeDto extends InitializePaystackTransactionDto {
  @IsEnum(PaystackPaymentChannel)
  @IsNotEmpty()
  channel: PaystackPaymentChannel;

  @ValidateIf((o) => o.channel === PaystackPaymentChannel.bank)
  @ValidateNested()
  @Type(() => BankChannelDto)
  @IsNotEmpty({ message: 'supported bank code and acc are required' })
  bank?: BankChannelDto;

  @ValidateIf((o) => o.channel === PaystackPaymentChannel.ussd)
  @ValidateNested()
  @Type(() => UssdChannelDto)
  @IsNotEmpty({ message: 'a supported ussd.type is required' })
  ussd?: UssdChannelDto;

  @ValidateIf((o) => o.channel === PaystackPaymentChannel.mobile_money)
  @ValidateNested()
  @Type(() => MobileMoneyChannelDto)
  @IsNotEmpty({ message: 'a supported mobile money provider is required' })
  mobile_money?: MobileMoneyChannelDto;
}

export enum PaystackTransferRecipientType {
  ghipss = 'ghipss',
  mobile_money = 'mobile_money',
  mobile_money_business = 'mobile_money_business',
  kepss = 'kepss',
  nuban = 'nuban',
  basa = 'basa',
  authorization = 'authorization',
}

export class CreateTransferRecipientDto {
  @IsEnum(PaystackTransferRecipientType)
  @IsNotEmpty()
  type: PaystackTransferRecipientType;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((o) => o.type !== PaystackTransferRecipientType.authorization)
  @IsNotEmpty()
  @IsString()
  bank_code: string;

  @ValidateIf((o) => o.type !== PaystackTransferRecipientType.authorization)
  @IsEnum(PaystackCurrency)
  currency: PaystackCurrency;

  @ValidateIf((o) => o.type !== PaystackTransferRecipientType.authorization)
  @IsNotEmpty()
  @IsString()
  account_number: string;

  @ValidateIf((o) => o.type === PaystackTransferRecipientType.authorization)
  @IsEmail({}, { message: 'a valid email is required' })
  email: string;

  @ValidateIf((o) => o.type === PaystackTransferRecipientType.authorization)
  @IsString()
  @IsNotEmpty()
  authorization_code: string;
}

export class InitiatePaystackTransferDto {
  @IsNumberString()
  @Min(1, { message: 'amount must be greater than zero.' })
  amount: string;

  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsOptional()
  @IsString()
  reason: string;
}
