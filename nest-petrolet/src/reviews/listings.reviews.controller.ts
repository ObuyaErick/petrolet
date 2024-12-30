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
import { CreateListingReviewDto } from './dto/create-review.dto';
import { ListingsReviewsService } from './listings.reviews.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('listing-reviews')
export class ListingsReviewsController {
  constructor(
    private readonly listingsReviewsService: ListingsReviewsService,
  ) {}

  @Post()
  create(
    @Body() createReviewDto: CreateListingReviewDto,
    @Request() req: ExpressRequest,
  ) {
    return this.listingsReviewsService.create(
      createReviewDto,
      req.authentication?.principal!!,
    );
  }

  @Get('index/:listingId')
  @Public()
  findListingReviews(
    @Param(
      'listingId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing ID'),
      }),
    )
    listingId: string,
  ) {
    return this.listingsReviewsService.findAll(listingId);
  }

  @Get(':id')
  @Public()
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing review ID'),
      }),
    )
    id: string,
  ) {
    return this.listingsReviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing review ID'),
      }),
    )
    id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.listingsReviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing review ID'),
      }),
    )
    id: string,
  ) {
    return this.listingsReviewsService.remove(id);
  }
}
