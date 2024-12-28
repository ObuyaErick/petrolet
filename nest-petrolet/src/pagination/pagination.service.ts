import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// Union type for all model names available in Prisma
export type ModelNames =
  (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

export type ModelProps = Prisma.TypeMap['meta']['modelProps'];

// Type for Prisma operations specific to a given model
type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap['model'][ModelName]['operations'];

// Type for Prisma findMany arguments specific to a given model
type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>['findMany']['args'];

// Type for pagination options, including model name, query filters, and pagination parameters
type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName; // Name of the model to paginate
  where?: PrismaFindManyArgs<ModelName>['where']; // Filtering conditions for the query
  orderBy?: PrismaFindManyArgs<ModelName>['orderBy']; // Sorting criteria for the query
  include?: PrismaFindManyArgs<ModelName>['include']; // Related models to include in the query
  page?: string; // Page number for pagination
  pageSize?: string; // Number of items per page for pagination
};

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  //   async paginate<ModelName extends ModelNames>({
  //     page,
  //     pageSize,
  //     modelName,
  //     where,
  //     orderBy,
  //     include,
  //   }: PaginationOptions<ModelName>) {
  //     try {
  //       const db = this.prisma[modelName];
  //       // Get the Prisma service corresponding to the modelName provided
  //       // This is equivalent to this.prismaService.user
  //       // (assuming that modelName is user)

  //       if (!page || !pageSize) {
  //         const items = await db.findMany({
  //           where: where || {},
  //           orderBy: orderBy || {
  //             createdAt: 'asc',
  //           },
  //           include: include || {},
  //         });
  //         return {
  //           items,
  //           totalCount: items.length,
  //         };
  //       }

  //       const skip = (+page - 1) * +pageSize;
  //       // Calculate the number of items to skip based on the current page and page size

  //       const totalCount = await db.count({
  //         where,
  //       });
  //       // Get the total count of items satisfying the provided conditions

  //       const items = await db.findMany({
  //         where,
  //         orderBy,
  //         skip,
  //         take: pageSize,
  //       });
  //       // Fetch paginated items based on the provided conditions, ordering, skip, and take

  //       return {
  //         items,
  //         totalCount,
  //         currentPage: 1,
  //         prevPage: 1,
  //       };
  //     } catch (error) {
  //       throw new NotFoundException('Data not found', error);
  //       // Throw a NotFoundException if data is not found or an error occurs
  //     }
  //   }
}
