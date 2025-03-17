import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_API_KEY'),
    );
  }

  getBalance() {
    return this.stripe.balance.retrieve();
  }
}
