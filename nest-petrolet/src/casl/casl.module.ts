import { Module } from '@nestjs/common';
import { CastAbilityFactory } from './cast-ability.factory/cast-ability.factory';

@Module({
  exports: [CastAbilityFactory],
  providers: [CastAbilityFactory],
})
export class CaslModule {}
