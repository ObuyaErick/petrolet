import { Controller, Get, Param } from '@nestjs/common';
import { MbinuStoreService } from './mbinu-store.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('mbinu')
@Public()
export class MbinuStoreController {
  constructor(private readonly mbinuStoreService: MbinuStoreService) {}

  @Get('read-profile')
  readProfile() {
    return this.mbinuStoreService.readProfile();
  }

  @Get('category-list')
  categories() {
    return this.mbinuStoreService.categories();
  }

  @Get('list-products/:remark')
  index(@Param('remark') remark: string) {
    return this.mbinuStoreService.index();
  }
}
