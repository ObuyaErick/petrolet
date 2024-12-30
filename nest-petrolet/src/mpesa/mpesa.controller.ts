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
    return Promise.all(
      this.mpesaService.numbers().map((phoneNumber) => {
        return this.mpesaService.stkPush({
          phoneNumber,
          amount: 100,
        });
      }),
    );
  }
}
