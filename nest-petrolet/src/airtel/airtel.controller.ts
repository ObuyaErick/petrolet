import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AirtelService } from './airtel.service';

@Controller('airtel')
export class AirtelController {
  constructor(private readonly airtelService: AirtelService) {}

  @Post('collections')
  @Public()
  airtel() {
    return this.airtelService.authorize();
  }

  @Post('ussd-push')
  @Public()
  ussdPush() {
    return this.airtelService.ussdPush();
  }
}
