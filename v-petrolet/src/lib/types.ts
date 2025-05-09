import * as Joi from "joi";

export type UUID = string;

export interface Entity {
  id: UUID;
}

export interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}

export interface GrantedAuthority extends Entity, TimeStamps {
  name: string;
}

export type Role = GrantedAuthority;

export interface Principal extends Entity {
  email: string;
  username: string;
}

export interface Initials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Authentication context
export interface AuthenticationContext {
  principal: Principal;
  authorities: GrantedAuthority[];
  initials: Initials;
}

export interface LoginForm {
  identity: string;
  password: string;
}

export interface UserRegistrationForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
  otp: string;
}

export interface AlertResponse {
  status: "success" | "error" | "warning" | "info";
  message: any;
}

export type DeleteResponse = AlertResponse;

export const loginSchema = Joi.object({
  identity: Joi.string().required().messages({
    "string.identity": "at least one of username, email, or phone is required",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({ "string.min": "Weak password" }),
});

export interface PetroletRange {
  start: string | number;
  end: string | number;
}

export function initPetroletRange(init: string | number = ""): PetroletRange {
  return {
    start: init,
    end: init,
  };
}

export type SortOrder = "asc" | "desc";

export interface SortRequest {
  key: string;
  order?: SortOrder;
}

export interface VDataLoaderProps {
  page?: number;
  itemsPerPage?: number;
  sortBy?: { key: string; order?: SortOrder }[];
}

export interface GroupByItem {
  title: string;
  key: string;
}

export interface Paginated<D> {
  page: number;
  limit: number;
  total: number;
  data: D[];
}

export interface CarListing extends Entity, TimeStamps {
  title: string;
  description: string;
  price: number;
  location: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  condition: string;
  color: string;
}

export type DataTableHeader<T = Record<string, any>> = {
  key?:
    | "data-table-group"
    | "data-table-select"
    | "data-table-expand"
    | (string & {});
  value?: string | ((item: T) => string);
  title?: string;

  fixed?: boolean;
  align?: "start" | "end" | "center";

  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  nowrap?: boolean;

  headerProps?: Record<string, any>;
  // cellProps?: HeaderCellProps

  sortable?: boolean;
  // sort?: DataTableCompareFunction
  // sortRaw?: DataTableCompareFunction
  // filter?: FilterFunction

  mobile?: boolean;

  children?: DataTableHeader<T>[];
};

export interface PaystackBank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const airtelBank: PaystackBank = {
  id: 819,
  name: "Airtel Kenya",
  slug: "airtel-ke",
  code: "ATL_KE",
  longcode: "ATL_KE",
  gateway: null,
  pay_with_bank: false,
  supports_transfer: true,
  active: true,
  country: "Kenya",
  currency: "KES",
  type: "mobile_money",
  is_deleted: false,
  createdAt: "2025-01-17T08:12:11.000Z",
  updatedAt: "2025-01-17T08:12:11.000Z",
};
