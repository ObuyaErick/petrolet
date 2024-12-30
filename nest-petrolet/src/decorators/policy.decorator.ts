import { SetMetadata } from '@nestjs/common';
import { AccessPolicy } from 'src/auth/authorization/policies.guard';

export const ACCESS_POLICY_KEY = 'access-policy';

export const UsePolicies = (...policies: AccessPolicy[]) =>
  SetMetadata(ACCESS_POLICY_KEY, policies);
