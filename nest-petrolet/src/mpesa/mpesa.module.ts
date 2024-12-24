import { Module } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { HttpModule } from '@nestjs/axios';
import { MpesaController } from './mpesa.controller';

@Module({
  imports: [HttpModule],
  providers: [MpesaService],
  controllers: [MpesaController],
})
export class MpesaModule {}
