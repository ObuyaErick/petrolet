import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';

@Injectable()
export class MtnService {
  async requestPayment() {
    const xmlBuilder = new xml2js.Builder({ headless: true });
    const payload = {
      g7bill: {
        key: '09AB1356F477D1224FAEFC568EEC401B',
        cmd: 'account',
        action: 'credit',
        pt: 'mm',
        mobile: '256763624639',
        amount: '500',
        callback: 'http://url.com/order.php',
        tx: '12345',
        description: 'Invoice# 12345',
      },
    };

    const xmlPayload = xmlBuilder.buildObject(payload);

    return axios
      .post('https://my.jpesa.com/api/', xmlPayload, {
        headers: {
          'Content-Type': 'application/xml',
          Accept: '*/*',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new BadRequestException(
          'Failed to process your payment request!',
          error?.response?.data || error.message,
        );
      });
  }
}
