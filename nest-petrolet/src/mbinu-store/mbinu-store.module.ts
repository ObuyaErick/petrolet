import { Module } from '@nestjs/common';
import { MbinuStoreController } from './mbinu-store.controller';
import { MbinuStoreService } from './mbinu-store.service';

@Module({
  controllers: [MbinuStoreController],
  providers: [MbinuStoreService]
})
export class MbinuStoreModule {}
