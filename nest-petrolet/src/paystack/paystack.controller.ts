import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { Public } from 'src/decorators/public.decorator';
import {
  CreateChargeDto,
  CreateTransferRecipientDto,
  PaystackCurrency,
  PaystackTransferRecipientType,
} from './paystack.types';

@Controller('paystack')
@Public()
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Get('success')
  async success(
    @Query('trxref') trxref: string,
    @Query('reference') reference: string,
  ) {
    console.log({ trxref, reference });
    return { status: 'Success' };
  }

  @Post('initialize')
  initialize() {
    return this.paystackService.initialize();
  }

  @Post('create-charge')
  createCharge(@Body() createChargeDto: CreateChargeDto) {
    return this.paystackService.createCharge(createChargeDto);
  }

  @Post('create-transfer-recipient')
  createTransferRecipient(
    @Body() createTransferRecipientDto: CreateTransferRecipientDto,
  ) {
    return this.paystackService.createTransferRecipient(
      createTransferRecipientDto,
    );
  }

  @Get('list-supported-banks')
  listSupportedBanks(
    @Query('currency') currency: PaystackCurrency,
    @Query('type') transferRecipientType: PaystackTransferRecipientType,
  ) {
    return this.paystackService.listSupportedTransferRecipientBanks({
      currency,
      type: transferRecipientType,
    });
  }

  @Post('web-hook')
  @HttpCode(HttpStatus.OK)
  paystackWebhook(@Body() body: any) {
    console.log(body);
    return { status: 'success' };
  }
}
