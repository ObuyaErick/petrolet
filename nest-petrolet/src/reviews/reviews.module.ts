import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SellersReviewsController } from './sellers.reviews.controller';
import { ListingsReviewsController } from './listings.reviews.controller';
import { SellersReviewsService } from './sellers.reviews.service';
import { ListingsReviewsService } from './listings.reviews.service';
import { ListingsService } from 'src/listings/listings.service';

@Module({
  controllers: [SellersReviewsController, ListingsReviewsController],
  providers: [
    ListingsService,
    SellersReviewsService,
    ListingsReviewsService,
    PrismaService,
  ],
})
export class ReviewsModule {}
