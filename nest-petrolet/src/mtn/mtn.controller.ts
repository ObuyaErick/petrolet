import { Controller, Post } from '@nestjs/common';
import { MtnService } from './mtn.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('mtn')
@Public()
export class MtnController {
  constructor(private readonly mtnService: MtnService) {}

  @Post('request-payment')
  async requestPayment() {
    return await this.mtnService.requestPayment();
  }
}
