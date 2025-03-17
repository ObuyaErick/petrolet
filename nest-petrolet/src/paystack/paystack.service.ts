import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of, map } from 'rxjs';
import {
  InitializedPaystackTransactionResponse,
  InitializePaystackTransactionPayload,
  PaystackCurrency,
} from './paystack.types';
import urlJoin from 'url-join';

@Injectable()
export class PaystackService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async initialize(): Promise<InitializedPaystackTransactionResponse | null> {
    const payload: InitializePaystackTransactionPayload = {
      email: 'customer@email.com',
      amount: '50',
      currency: PaystackCurrency.KES,
      callback_url: urlJoin(
        this.configService.getOrThrow<string>('LOOPBACK_HOST'),
        '/paystack/success',
      ),
    };

    return await firstValueFrom(
      this.httpService
        .post<
          InitializedPaystackTransactionResponse,
          InitializePaystackTransactionPayload
        >(
          urlJoin(
            this.configService.getOrThrow<string>('PAYSTACK_BASEURL'),
            '/transaction/initialize',
          ),
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
          catchError((error) => {
            return of(error?.response?.data || null);
          }),
        ),
    );
  }
}
