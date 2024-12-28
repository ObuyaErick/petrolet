import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  exports: [PaginationService],
  providers: [PaginationService, PrismaService],
})
export class PaginationModule {}
