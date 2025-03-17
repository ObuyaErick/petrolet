import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map, of } from 'rxjs';

class AirtelAuthorization {
  access_token: string;
  expires_in: string;
  token_type: string;
  time_stamp: number;
}

@Injectable()
export class AirtelService {
  private auth: AirtelAuthorization | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async authorize(): Promise<AirtelAuthorization | null> {
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
        .post<Omit<AirtelAuthorization, 'time_stamp'>>(
          `${this.configService.get<string>('AIRTEL_BASE_URL')}auth/oauth2/token`,
          {
            grant_type: 'client_credentials',
            client_id: this.configService.get<string>('AIRTEL_CLIENT_ID'),
            client_secret: this.configService.get<string>(
              'AIRTEL_CLIENT_SECRET',
            ),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
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
          catchError((e) => {
            console.error('Failed to authorize with Airtel', e.message);

            return of(null);
          }),
        ),
    );
  }

  async ussdPush() {
    const authorization = await this.authorize();

    if (!authorization) {
      throw new UnauthorizedException('Failed to authorize with Airtel');
    }

    return await firstValueFrom(
      this.httpService.post<string>(
        `${this.configService.get<string>('AIRTEL_BASE_URL')}merchant/v2/payments/`,
        {
          reference: 'Testing transaction',
          subscriber: {
            country: 'UG',
            currency: 'UGX',
            msisdn: '12****89',
          },
          transaction: {
            amount: 1000,
            country: 'UG',
            currency: 'UGX',
            id: 'random-unique-id',
          },
        },
        {
          headers: {
            Accept: '*/* ',
            'Content-Type': 'application/json',
            'X-Country': 'UG',
            'X-Currency': 'UGX',
            Authorization: 'Bearer UC*******2w',
            ' x-signature': 'MGsp*****************Ag==',
            ' x-key': 'DVZC*******************NM=',
          },
        },
      ),
    );
  }
}
