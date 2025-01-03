/**
 * Pagination information
 */
export type Pagination = {
  page?: number;
  limit?: number;
};

/**
 * Paginated
 *
 * type of the findManyPaginated method
 */
export type Paginated<F extends ProxyFunctions> = {
  paginate: (
    data?: Omit<Parameters<F['findMany']>[0], 'take' | 'skip'>,
    pagination?: Pagination,
  ) => Promise<Awaited<ReturnType<F['findMany']>>[0]>;
};

/**
 * Proxy functions
 *
 * Used to create custom methods for prisma models
 */
export type ProxyFunctions = {
  findMany: (params: unknown, pagination: Pagination) => Promise<any>;
  count: (params: unknown) => Promise<number>;
};

type ProxyPrismaModel<F extends ProxyFunctions> = F & Paginated<F>;

/**
 * ProxyPrismaModel
 *
 * the factory function that creates a ProxyPrismaModel
 *
 * @param model prisma model being proxied
 * @returns an instance of a ProxyPrismaModel
 */
export function ProxyPrismaModel<F extends ProxyFunctions>(
  model: F,
): ProxyPrismaModel<F> {
  Reflect.set(model, 'paginate', makePaginate(model));
  return model as ProxyPrismaModel<F>;
}

export function makePaginate(model: ProxyFunctions) {
  return new Proxy(model.findMany, {
    apply: async (target, thisArg, [data, paginationInfo]) => {
      const page: number = paginationInfo?.page || 1;
      const limit: number =
        paginationInfo?.limit || paginationInfo?.limit === 0
          ? paginationInfo?.limit
          : 10;

      const query = data || {};
      query.take = limit === 0 ? undefined : limit;
      query.skip = (page - 1) * limit || 0;

      const [total, docs] = await Promise.all([
        model.count({
          where: query.where,
        }),
        target.apply(thisArg, [query]),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: docs,
        total,
        limit,
        page,
        totalPages: totalPages === Infinity ? 1 : totalPages,
      };
    },
  });
}
