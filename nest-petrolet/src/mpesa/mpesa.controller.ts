import { Controller, Get } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('mpesa')
@Public()
export class MpesaController {
  constructor(private readonly mpesaService: MpesaService) {}

  @Get('authorize')
  authorize() {
    return this.mpesaService.authorize();
  }

  @Get('stk-push')
  stkPush() {
    return this.mpesaService.stkPush({
      phoneNumber: '254110873314',
      amount: 8000,
    });
  }
}
