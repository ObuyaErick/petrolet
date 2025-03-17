import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { Public } from 'src/decorators/public.decorator';

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
}
