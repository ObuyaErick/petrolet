import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('paypal')
@Public()
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Get('create')
  async createPayment() {
    return await this.paypalService
      .createPayment(10.0)
      .then((payment) => {
        // Check if there exists an approval url
        const approvalUrl = payment.links?.find(
          (link) => link.rel === 'approval_url',
        );

        if (approvalUrl) {
          return payment;
        }

        throw new BadRequestException('No approval URL found');
      })
      .catch((error) => {
        console.log('E2: ', error);
        throw new InternalServerErrorException(`Error: ${error.message}`);
      });
  }

  @Get('success')
  async executePayment(
    @Query('paymentId') paymentId: string,
    @Query('PayerID') payerId: string,
  ) {
    return this.paypalService
      .executePayment(paymentId, payerId)
      .then((result) => {
        return { message: 'Payment Successful', result };
      })
      .catch((error) => {
        throw new InternalServerErrorException({
          error: error.response || error.message,
        });
      });
  }

  @Get('cancel')
  async cancelPayment() {
    return { message: 'Payment Cancelled' };
  }
}
