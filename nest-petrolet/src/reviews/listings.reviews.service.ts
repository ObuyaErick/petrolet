import { Injectable } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListingReviewDto } from './dto/create-review.dto';
import { Principal } from 'src/auth/authentication/authentication.guard';
import { ListingsService } from 'src/listings/listings.service';

@Injectable()
export class ListingsReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly listingsService: ListingsService,
  ) {}

  async create(
    createListingReviewDto: CreateListingReviewDto,
    loggedInPrincipal: Principal,
  ) {
    // Check if listing exists
    await this.listingsService.ensureExistsById(
      createListingReviewDto.listingId,
    );

    return await this.prisma.listingReview.create({
      data: { ...createListingReviewDto, reviewerId: loggedInPrincipal.id },
    });
  }

  async findAll(listingId: string) {
    // Check if listing exists
    await this.listingsService.ensureExistsById(listingId);

    return await this.prisma.listingReview.findMany({
      where: {
        listingId,
      },
    });
  }

  async findOne(id: string) {
    return await this.ensureExistsById(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.listingReview.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    await this.prisma.listingReview.delete({
      where: { id },
    });
    return null;
  }

  async ensureExistsById(id: string) {
    return await this.prisma.listingReview.findUniqueOrThrow({
      where: { id },
    });
  }
}
