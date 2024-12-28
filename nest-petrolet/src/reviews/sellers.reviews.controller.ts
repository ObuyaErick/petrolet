import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateSellerReviewDto } from './dto/create-review.dto';
import { SellersReviewsService } from './sellers.reviews.service';
import { Public } from 'src/decorators/route.decorator';

@Controller('seller-reviews')
@Public()
export class SellersReviewsController {
  constructor(private readonly sellersReviewsService: SellersReviewsService) {}

  @Post()
  create(
    @Body() createReviewDto: CreateSellerReviewDto,
    @Request() req: ExpressRequest,
  ) {
    return this.sellersReviewsService.create(
      createReviewDto,
      req.authentication?.principal!!,
    );
  }

  @Get('index/:sellerId')
  findAll(
    @Param(
      'sellerId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller ID'),
      }),
    )
    sellerId: string,
  ) {
    return this.sellersReviewsService.findAll(sellerId);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller review ID'),
      }),
    )
    id: string,
  ) {
    return this.sellersReviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller review ID'),
      }),
    )
    id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.sellersReviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller review ID'),
      }),
    )
    id: string,
  ) {
    return this.sellersReviewsService.remove(id);
  }
}
