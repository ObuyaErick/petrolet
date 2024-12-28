import { insertQueryParams } from "./utils";

const URL_HEAD: string = import.meta.env.VITE_SERVER_HOST;
interface APIDefinition {
  path: string;
  params?: string[];
}

// Pagination Keys
const pageable = ["page?", "limit?"] as const;
// Ordering key
const sortable = ["order?"] as const;
// Search Key
const searchable = ["search?"] as const;
// Filters Key
const filterable = ["filter?"] as const;

/*
 * Server APIS object
 * Each entry includes a mandatory path property and an optional params array property
 * depending on the path params as defined in the path prepended by a full colon
 * and query params that will be inserted as request query parameters in the final url
 * returned by the build method.
 */
const APIS = {
  // Authentication and authorization
  "AUTH-SIGN-IN": { path: "/auth/signin" },
  "AUTH-SIGN-OUT": { path: "/auth/signout" },
  "AUTH-SIGN-UP": {
    path: "/auth/signup",
  },
  "AUTH-CURRENT-USER": { path: "/auth/current-user" },
  "AUTH-REQUEST-PASSWORD-RESET": { path: "/auth/request-password-reset" },
  "AUTH-RESET-PASSWORD": { path: "/auth/reset-password" },
  "AUTH-REQUEST-OTP-PUBLIC": { path: "/auth/request-otp/public" },
  "AUTH-REQUEST-OTP-AUTHENTICATED": { path: "/auth/request-otp/authenticated" },
  "USER-CHECK-UNIQUE-EXISTENCE": {
    path: "/users/check/unique-existence",
  },

  /* ------- LISTINGS ------- */
  "LISTINGS-INDEX": {
    path: "/listings",
    params: [...pageable, ...sortable, ...searchable, ...filterable],
  },
  "LISTINGS-SHOW": { path: "/listings/:listingId", params: ["listingId"] },
  "LISTINGS-CREATE": { path: "/listings/create" },
  "LISTINGS-RECENTS": { path: "/listings/feed/recents" },
  "LISTINGS-FEATURED": { path: "/listings/feed/featured" },
  "LISTINGS-POPULAR": { path: "/listings/feed/popular" },
} as const;

// APIS object keys
type APIKey = keyof typeof APIS;

// Extracting required and optional keys
type ParseParams<P extends readonly string[]> = P extends readonly [
  infer Head,
  ...infer Tail
]
  ? Head extends `${infer Key}?`
    ? Partial<Record<Key, string | number>> &
        ParseParams<Tail extends string[] ? Tail : []>
    : Record<Head & string, string | number> &
        ParseParams<Tail extends string[] ? Tail : []>
  : {};

// Detect if all keys of a Record are optional
export type AllKeysAreOptional<T> = keyof T extends never
  ? true // No keys in the Record
  : {
      [K in keyof T]: T extends Record<K, T[K]>
        ? T[K] extends undefined
          ? true
          : false
        : true;
    } extends { [K in keyof T]: true }
  ? true
  : false;

// Detect if all params are optional
export type AllParamsAreOptional<P extends readonly string[]> =
  P extends `${string}?`[] ? true : false;

// Build Params
type BuildParams<T extends APIKey> = T extends APIKey
  ? (typeof APIS)[T] extends { params: readonly string[] }
    ? ParseParams<(typeof APIS)[T]["params"]>
    : undefined
  : never;

export class ApiBuilder<T extends APIKey> {
  #apiKey: T;
  #path: string;

  private constructor(apiKey: T) {
    const apiDefinition = APIS[apiKey];
    this.#path = apiDefinition.path;
    this.#apiKey = apiKey;
  }

  static getInstance<K extends APIKey>(apiKey: K): ApiBuilder<K> {
    return new ApiBuilder(apiKey);
  }

  build(
    params: BuildParams<T> extends undefined
      ? void
      : AllKeysAreOptional<BuildParams<T>> extends true
      ? BuildParams<T> | void
      : BuildParams<T>
  ): string {
    const baseUrl = `${URL_HEAD}${this.#path}`;
    const apiDefinition: APIDefinition = APIS[this.#apiKey] as APIDefinition;
    if (params && apiDefinition?.params && apiDefinition?.params.length) {
      const url = apiDefinition.params.reduce((acc, curr) => {
        // Search and replace the path parameters in the actual path/endpoint
        const parameterValue = (params as Record<string, string | number>)[
          curr
        ];
        acc = acc.replace(`:${curr}`, String(parameterValue ?? ""));
        // Delete key catasy of avoiding intended path parameters as query parameters
        delete (params as Record<string, string | number>)[curr];

        return acc;
      }, baseUrl);

      return insertQueryParams(url, params);
    }

    return baseUrl;
  }
}
