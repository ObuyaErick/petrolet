import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of, map } from 'rxjs';
import {
  BankChannelDto,
  CreateChargeDto,
  CreateTransferRecipientDto,
  InitializePaystackTransactionPayload,
  InitiatePaystackTransferDto,
  MobileMoneyChannelDto,
  PaystackCurrency,
  PaystackPaymentChannel,
  PaystackTransferRecipientType,
  UssdChannelDto,
} from './paystack.types';
import { randomUUID } from 'crypto';

@Injectable()
export class PaystackService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    let payload: {
      bank?: BankChannelDto;
      ussd?: UssdChannelDto;
      mobile_money?: MobileMoneyChannelDto;
    };
    if (createChargeDto.channel === PaystackPaymentChannel.bank) {
      payload = { bank: createChargeDto.bank };
    } else if (createChargeDto.channel === PaystackPaymentChannel.ussd) {
      payload = { ussd: createChargeDto.ussd };
    } else if (
      createChargeDto.channel === PaystackPaymentChannel.mobile_money
    ) {
      payload = { mobile_money: createChargeDto.mobile_money };
    } else {
      throw new BadRequestException(
        `Invalid payment channel. Suported channels are ${PaystackPaymentChannel.bank}, ${PaystackPaymentChannel.ussd} and ${PaystackPaymentChannel.mobile_money}.`,
      );
    }

    return await firstValueFrom(
      this.httpService
        .post(
          new URL(
            'charge',
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
          ).toString(),
          {
            email: createChargeDto.email,
            amount: createChargeDto.amount,
            currency: createChargeDto.currency,
            ...payload,
          },
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
            },
          },
        )
        .pipe(
          map((response) => {
            const { data } = response;
            return data;
          }),
          catchError((error) => {
            return of(error?.response?.data);
          }),
        ),
    );
  }

  async createTransferRecipient(
    createTransferRecipientDto: CreateTransferRecipientDto,
  ) {
    return await firstValueFrom(
      this.httpService
        .post(
          new URL(
            'transferrecipient',
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
          ).toString(),
          createTransferRecipientDto.type ===
            PaystackTransferRecipientType.authorization
            ? {
                type: createTransferRecipientDto.type,
                name: createTransferRecipientDto.name,
                // Authorization specifics
                email: createTransferRecipientDto.email,
                authorization_code:
                  createTransferRecipientDto.authorization_code,
              }
            : {
                type: createTransferRecipientDto.type,
                name: createTransferRecipientDto.name,
                // Non-authorization alternatives
                bank_code: createTransferRecipientDto.bank_code,
                account_number: createTransferRecipientDto.account_number,
                currency: createTransferRecipientDto.currency,
              },
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
            },
          },
        )
        .pipe(
          map((res) => res.data),
          catchError((err) => {
            console.log(err);
            return of(
              err?.response?.data || {
                message:
                  err?.message || 'Failed to create a transfer recipient',
              },
            );
          }),
        ),
    );
  }

  async initiateTransfer(initiateTransfer: InitiatePaystackTransferDto) {
    return await firstValueFrom(
      this.httpService
        .post(
          new URL(
            'transfer',
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
          ).toString(),
          {
            source: 'balance',
            reference: randomUUID(),
            amount: initiateTransfer.amount,
            recipient: initiateTransfer.recipient,
            reason: initiateTransfer.reason,
          },
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
            },
          },
        )
        .pipe(
          map((res) => res.data),
          catchError((err) => {
            return of(
              err?.response?.data || {
                message:
                  err?.message ||
                  'Failed to initiate transfer to this recipeint',
              },
            );
          }),
        ),
    );
  }

  async listSupportedTransferRecipientBanks(listOptions: {
    currency: PaystackCurrency;
    type?: PaystackTransferRecipientType;
  }) {
    return await firstValueFrom(
      this.httpService
        .get(
          new URL(
            'bank',
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
          ).toString(),
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
            },
            params: {
              currency: listOptions.currency,
              // Add type if present
              ...(listOptions.type ? { type: listOptions.type } : {}),
            },
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((err) =>
            of(
              err?.response?.data || {
                message:
                  err?.message ||
                  'Failed to retrieve a list of supported transfer recipient banks',
              },
            ),
          ),
        ),
    );
  }

  async initialize() {
    const payload: InitializePaystackTransactionPayload = {
      email: 'customer@email.com',
      amount: '50',
      currency: PaystackCurrency.KES,
      callback_url: new URL(
        'paystack/success',
        this.configService.getOrThrow<string>('LOOPBACK_HOST'),
      ).toString(),
    };

    return await firstValueFrom(
      this.httpService
        .post<any, InitializePaystackTransactionPayload>(
          new URL(
            'transaction/initialize',
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
          ).toString(),
          payload,
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
            },
          },
        )
        .pipe(
          map((response) => {
            const { data } = response;
            return data;
          }),
          catchError((err) =>
            of(
              err?.response?.data || {
                message: err?.message || 'Failed to initialize transaction',
              },
            ),
          ),
        ),
    );
  }
}
