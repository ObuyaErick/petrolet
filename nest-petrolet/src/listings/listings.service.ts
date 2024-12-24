import { Injectable } from '@nestjs/common';
import { CreateListingDto, ListingFilters } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderBy } from 'src/lib/definitions';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createListingDto: CreateListingDto) {
    return 'This action adds a new listing';
  }

  async findAll({
    pageNumber,
    pageLimit,
    filters,
    search,
    order,
  }: {
    pageNumber: number;
    pageLimit: number;
    filters?: ListingFilters;
    search?: string;
    order?: OrderBy;
  }) {
    return {
      total: await this.prisma.listing.count(),
      page: pageNumber,
      limit: pageLimit,
      data: await this.prisma.listing.findMany({
        where: {},
        orderBy: {
          updatedAt: 'desc',
        },
        take: pageLimit,
      })
    }
  }

  async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: string) {
    return `This action removes a #${id} listing`;
  }

  async ensureExistsById(listingId: string) {
    return await this.prisma.listing.findUniqueOrThrow({
      where: { id: listingId },
    });
  }

  isListingField(fieldName: string): boolean {
    return Object.keys(this.prisma.listing.fields).includes(fieldName);
  }
}
