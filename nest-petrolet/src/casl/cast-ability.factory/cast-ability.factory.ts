import { defineAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Seller } from 'src/sellers/entities/seller.entity';

@Injectable()
export class CastAbilityFactory {
  defineAbility() {
    const ability = defineAbility((can, cannot) => {
      // 362eaf39-7510-4c64-ad8b-5b4d3dc79762
      // const today = new Date().setHours(0, 0, 0, 0);
      can('read', 'Seller', {
        createdAt: { $lte: new Date().setHours(0, 0, 0, 0) },
        status: { $in: ['published', 'review'] },
      });
    });

    return ability;
  }
}

// import {
//   MongoAbility,
//   Subject as CaslSubject,
//   MongoQuery,
//   RawRuleOf,
//   createMongoAbility,
// } from '@casl/ability';
// import { Injectable } from '@nestjs/common';
// import { Principal } from 'src/auth/authentication/authentication.guard';
// import { Action, Effect, Subject } from 'src/auth/authorization/policies.guard';

// export type Abilities<A extends string, S extends CaslSubject> = [A, S];
// export type AppAbility<A extends string, S extends CaslSubject> = MongoAbility<
//   Abilities<A, S>,
//   MongoQuery
// >;

// @Injectable()
// export class CastAbilityFactory<
//   A extends string = Action,
//   S extends CaslSubject = Subject,
// > {
//   constructor() {}

//   async defineAbility(
//     policies: any,
//     user: Principal,
//   ): Promise<AppAbility<A, S>> {
//     // Flatten all statements from policies
//     const allStatements = policies.flatMap((policy: any) => policy.statements);
//     const rules: RawRuleOf<AppAbility<A, S>>[] = [];

//     // Process all statements
//     // allStatements.forEach((statement) => {
//     //   const fields: string[] = [];
//     //   const conditions = {};

//     //   const rule = {
//     //     action: statement.actions,
//     //     subject: statement.resources,
//     //     fields,
//     //     conditions,
//     //   } as RawRuleOf<AppAbility<A, S>>;

//     //   if (statement.effect === Effect.Allow) {
//     //     rules.unshift(rule);
//     //   } else if (statement.effect === Effect.Deny) {
//     //     rule.inverted = true;
//     //     // Place deny rules at the end
//     //     rules.push(rule);
//     //   }
//     // });

//     return createMongoAbility<AppAbility<A, S>>(rules);
//   }
// }
