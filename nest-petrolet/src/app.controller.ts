import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';
import { UsePolicies } from './decorators/policy.decorator';
import { PoliciesGuard } from './auth/authorization/policies.guard';
import { PrismaService } from './prisma/prisma.service';
import { CastAbilityFactory } from './casl/cast-ability.factory/cast-ability.factory';
import { Seller } from './sellers/entities/seller.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly ability: CastAbilityFactory,
  ) {}

  @Get()
  @Public()
  welcome() {
    return this.appService.welcome();
  }

  @Get('casl')
  @Public()
  @UsePolicies()
  // (ability) => {
  //   // return ability.can('read', 'article');
  // }
  @UseGuards(PoliciesGuard)
  async casl() {
    // const seller = await this.prisma.seller.findUniqueOrThrow({
    //   where: {
    //     id: '362eaf39-7510-4c64-ad8b-5b4d3dc79762',
    //   },
    // });
    const sellerAbility = this.ability.defineAbility();
    const canReadSeller = sellerAbility.can(
      'read',
      new Seller(1, new Date().setHours(0, 0, 0, 0), 'review'),
    );
    return {
      message: 'Policy passed',
      canReadSeller,
    };
  }
}
