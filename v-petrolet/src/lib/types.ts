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
  name: string;
  email: string;
  username: string;
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

export interface Paginated {
  page: number;
  limit: number;
  total: number;
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
