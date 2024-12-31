import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map, of } from 'rxjs';

class MpesaAuthorization {
  access_token: string;
  expires_in: string;
  time_stamp: number;
}

class StkPushResponse {}

@Injectable()
export class MpesaService {
  private auth: MpesaAuthorization | null = null;

  constructor(private readonly httpService: HttpService) {}

  async authorize(): Promise<MpesaAuthorization | null> {
    const startTime = Date.now();

    if (
      this.auth &&
      this.auth.time_stamp + Number(this.auth.expires_in || 0) * 1000 >
        startTime
    ) {
      return this.auth;
    }

    return await firstValueFrom(
      this.httpService
        .get<Omit<MpesaAuthorization, 'time_stamp'>>(
          'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
          {
            headers: {
              Authorization:
                'Basic bVJmUXd1OGpBUkdSYVlKdFZXWkE3OVlhTHB0bWs4cDY6dlh6SmJtMTZBcjhLOVpWOQ==',
            },
          },
        )
        .pipe(
          map((response) => {
            const { data } = response;
            const auth = {
              ...data,
              time_stamp: startTime,
            };
            this.auth = auth;
            return this.auth;
          }),
          catchError(() => of(null)),
        ),
    );
  }

  async stkPush({
    phoneNumber,
    amount,
  }: {
    phoneNumber: string;
    amount: number;
  }) {
    return await firstValueFrom(
      this.httpService
        .post<StkPushResponse>(
          'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
          {
            BusinessShortCode: 174379,
            Password:
              'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMjI0MTMwOTI1',
            Timestamp: '20241224130925',
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: 174379,
            PhoneNumber: phoneNumber,
            CallBackURL: 'https://mydomain.com/path',
            AccountReference: 'PETROLET: JACK PAY MONEY ANUS',
            TransactionDesc: 'Contribution towards reunion party',
          },
          {
            headers: {
              Authorization: 'Bearer SBRuyBHIQKeKYEDAmDetAZfklYRk',
            },
          },
        )
        .pipe(
          map((response) => {
            const { data } = response;
            return {
              phoneNumber,
              ...data,
            };
          }),
          catchError(() => of(null)),
        ),
    );
  }

  numbers() {
    return [
      //   '254116141599',
      //   '254707752966',
      //   '254741642317',
      //   '254748594577',
      //   '254701401574',
      //   '254716533852',
      //   '254758836939',
      //   '254718284480',
      //   '254745519752',
      //   '254796237519',
      //   '254792797835',
      //   '254715428664',
      //   '254723770298',
      //   '254707826494',
      //   '254711100144',
      //   '254795426995',
      //   '254748450362',
      //   '254746402429',
      //   '254713360685',
      //   '254743659271',
      //   '254712480148',
      //   '254796876692',
      //   '254746170701',
      //   '254715508787',
      //   '254700511035',
      //   '254701711330',
      //   '254714889820',
      //   '254757220960',
      //   '254791375587',
      //   '254791676950',

    ];
  }
}
