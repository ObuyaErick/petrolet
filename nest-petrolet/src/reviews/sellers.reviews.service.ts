import { Injectable } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSellerReviewDto } from './dto/create-review.dto';
import { Principal } from 'src/auth/authentication/authentication.guard';
import { SellersService } from 'src/sellers/sellers.service';

@Injectable()
export class SellersReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sellersService: SellersService,
  ) {}

  async create(
    createSellerReviewDto: CreateSellerReviewDto,
    loggedInPrincipal: Principal,
  ) {
    // Check if seller exists
    await this.sellersService.ensureExistsById(createSellerReviewDto.sellerId);

    return await this.prisma.sellerReview.create({
      data: { ...createSellerReviewDto, reviewerId: loggedInPrincipal.id },
    });
  }

  async findAll(sellerId: string) {
    // Check if seller exists
    await this.sellersService.ensureExistsById(sellerId);

    return await this.prisma.sellerReview.findMany({
      where: {
        sellerId,
      },
    });
  }

  async findOne(id: string) {
    return await this.ensureExistsById(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.sellerReview.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    await this.prisma.sellerReview.delete({
      where: { id },
    });
    return null;
  }

  async ensureExistsById(id: string) {
    return await this.prisma.sellerReview.findUniqueOrThrow({
      where: { id },
    });
  }
}
