import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { PaystackController } from './paystack.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PaystackService],
  controllers: [PaystackController],
})
export class PaystackModule {}
