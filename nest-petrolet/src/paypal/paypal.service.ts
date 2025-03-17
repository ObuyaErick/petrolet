import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configure, Payment, payment, PaymentResponse } from 'paypal-rest-sdk';
import urlJoin from 'url-join';

@Injectable()
export class PaypalService {
  constructor(private readonly configService: ConfigService) {
    configure({
      mode: this.configService.getOrThrow<string>('PAYPAL_MODE'),
      client_id: this.configService.getOrThrow<string>('PAYPAL_CLIENT_ID'),
      client_secret: this.configService.getOrThrow<string>(
        'PAYPAL_CLIENT_SECRET',
      ),
    });
  }

  async createPayment(
    amount: number,
    currency: string = 'USD',
  ): Promise<PaymentResponse> {
    const paymentPayload: Payment = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [{ amount: { total: `${amount}`, currency } }],
      redirect_urls: {
        return_url: urlJoin(
          this.configService.getOrThrow<string>('LOOPBACK_HOST'),
          '/paypal/success',
        ),
        cancel_url: urlJoin(
          this.configService.getOrThrow<string>('LOOPBACK_HOST'),
          '/paypal/cancel',
        ),
      },
    };

    return new Promise((resolve, reject) => {
      payment.create(paymentPayload, (error, payment) => {
        if (error) reject(error);
        else resolve(payment as PaymentResponse);
      });
    });
  }

  async executePayment(
    paymentId: string,
    payerId: string,
  ): Promise<PaymentResponse> {
    return new Promise((resolve, reject) => {
      payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
        if (error) reject(error);
        else resolve(payment);
      });
    });
  }
}
