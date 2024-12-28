import { Injectable } from '@nestjs/common';
import { CreateListingDto, ListingFilters } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderBy } from 'src/lib/definitions';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto) {
    return await this.prisma.listing.create({
      data: createListingDto,
    });
  }

  async recents() {
    return await this.prisma.listing.findMany({
      where: {},
      orderBy: {
        updatedAt: 'desc',
      },
      take: 7,
    });
  }

  async featured() {
    return await this.prisma.listing.findMany({
      where: {},
      orderBy: {
        updatedAt: 'desc',
      },
      take: 7,
    });
  }

  async popular() {
    return await this.prisma.listing.findMany({
      where: {},
      orderBy: {
        updatedAt: 'desc',
      },
      take: 7,
    });
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
      }),
    };
  }

  async findOne(id: string) {
    return await this.ensureExistsById(id);
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    return await this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: string) {
    await this.prisma.listing.delete({
      where: { id },
    });
    return null;
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
