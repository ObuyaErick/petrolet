import { Module } from '@nestjs/common';
import { PoliciesGuard } from './policies.guard';
import { CastAbilityFactory } from 'src/casl/cast-ability.factory/cast-ability.factory';

@Module({
  providers: [PoliciesGuard, CastAbilityFactory],
  exports: [PoliciesGuard],
})
export class AuthorizationModule {}
