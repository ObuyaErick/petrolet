import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto, ListingFilters } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Public } from 'src/decorators/public.decorator';
import { OrderBy } from 'src/lib/definitions';

@Controller('listings')
@Public()
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get('feed/recents')
  findRecents() {
    return this.listingsService.recents();
  }

  @Get('feed/featured')
  findFeatured() {
    return this.listingsService.featured();
  }

  @Get('feed/popular')
  findPopular() {
    return this.listingsService.popular();
  }

  @Get()
  findAll(
    @Query(
      'page',
      new ParseIntPipe({
        optional: true,
      }),
    )
    page: number | undefined,
    @Query(
      'limit',
      new ParseIntPipe({
        optional: true,
      }),
    )
    limit: number | undefined,
    @Query('filter') filterParams: string | undefined,
    @Query('search') searchString: string | undefined,
    @Query('order') order: string | undefined,
  ) {
    const pageNumber = page || 1;
    const pageLimit = limit || 10;

    const filters: ListingFilters | undefined = filterParams
      ? (filterParams.split('<|>').reduce(
          (acc, curr) => {
            const [k, v] = curr.split('<>');
            acc[k] = v;
            return acc;
          },
          {} as Record<string, string>,
        ) as ListingFilters)
      : undefined;

    const [listingField, orderCriteria] = order ? order.split(',') : [];
    const orderBy: OrderBy | undefined =
      listingField && this.listingsService.isListingField(listingField)
        ? {
            key: listingField,
            order:
              orderCriteria === 'asc' || orderCriteria === 'desc'
                ? orderCriteria
                : 'asc',
          }
        : undefined;

    return this.listingsService.findAll({
      pageNumber,
      pageLimit,
      filters,
      search: searchString,
      order: orderBy,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing ID'),
      }),
    )
    id: string,
  ) {
    return this.listingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing ID'),
      }),
    )
    id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for listing ID'),
      }),
    )
    id: string,
  ) {
    return this.listingsService.remove(id);
  }
}
