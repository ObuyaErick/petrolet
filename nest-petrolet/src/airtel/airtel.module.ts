import { Module } from '@nestjs/common';
import { AirtelService } from './airtel.service';
import { AirtelController } from './airtel.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AirtelService],
  controllers: [AirtelController],
})
export class AirtelModule {}
