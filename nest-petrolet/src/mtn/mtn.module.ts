import { Module } from '@nestjs/common';
import { MtnService } from './mtn.service';
import { MtnController } from './mtn.controller';

@Module({
  providers: [MtnService],
  controllers: [MtnController]
})
export class MtnModule {}
