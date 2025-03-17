import { Controller, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('stripe')
@Public()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('balance')
  async getBalance() {
    const balance = await this.stripeService.getBalance();
    return balance;
  }
}
