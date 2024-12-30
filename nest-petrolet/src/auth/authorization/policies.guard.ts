import { MongoAbility } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CastAbilityFactory } from 'src/casl/cast-ability.factory/cast-ability.factory';
import { ACCESS_POLICY_KEY } from 'src/decorators/policy.decorator';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const subjects = [
  'User',
  'Listing',
  'ListingReview',
  'Seller',
  'SellerReview',
] as const;
export type Subject = (typeof subjects)[number];

export enum Effect {
  Allow = 'Allow',
  Deny = 'Deny',
}

export class Statement {}

export type PolicyHandler = (ability: MongoAbility) => boolean;

export interface IPolicyHandler {
  handle: PolicyHandler;
}

export type AccessPolicy = PolicyHandler | IPolicyHandler;

// export class AccessPolicy {
//   version: string;
//   statements: Statement[];
// }

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly abilityFactory: CastAbilityFactory,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const policies = this.reflector.getAllAndOverride<AccessPolicy[]>(
      ACCESS_POLICY_KEY,
      [context.getClass(), context.getHandler()],
    );

    const ability = this.abilityFactory.defineAbility();

    if (
      policies.every((policy) => {
        let test: boolean;
        if (typeof policy === 'function') {
          test = policy(ability);
        } else {
          test = policy.handle(ability);
        }
        return test;
      })
    ) {
      return true;
    }
    throw new ForbiddenException('Policy Violation');
  }
}
