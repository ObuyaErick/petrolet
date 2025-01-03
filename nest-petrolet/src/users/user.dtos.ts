import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMatching } from 'src/validators/ismatching.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'first name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsEmail({}, { message: 'invalid email address' })
  email: string;

  @IsPhoneNumber('KE', { message: 'a valid phone number is required' })
  phoneNumber: string;

  @IsStrongPassword({ minLength: 8 }, { message: 'weak password' })
  password: string;

  @ValidateIf((o, v) => !!o.password && !!o.confirmPassword)
  @IsMatching('password', { message: 'passwords do not match' })
  confirmPassword: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'password',
    'confirmPassword',
    'email',
    'phoneNumber',
    'username',
  ] as const),
) {}

export class SignInDto {
  @IsNotEmpty({
    message: 'an email, a phone number, or a username is required',
  })
  identity: string;

  @IsNotEmpty({ message: 'a password is required' })
  password: string;
}

export class PasswordResetRequestDto extends OmitType(SignInDto, [
  'password',
]) {}

export class PasswordResetDto {
  @IsStrongPassword({ minLength: 8 }, { message: 'weak password' })
  newPassword: string;

  @ValidateIf((o, _v) => !!o.newPassword && !!o.confirmNewPassword)
  @IsMatching('newPassword', { message: 'passwords do not match' })
  confirmNewPassword: string;

  @Length(6, 6, { message: 'otp must be 6 characters' })
  otp: string;
}

export enum OtpRequestReason {
  PASSWORD_RESET = 'password-reset',
  ACCOUNT_ACTIVATION = 'account-activation',
}

export class PublicOtpRequest {
  @IsEnum(OtpRequestReason)
  reason: OtpRequestReason;

  @IsNotEmpty({
    message: 'identiy is required',
  })
  identity: string;
}

export class AuthenticatedOtpRequest extends OmitType(PublicOtpRequest, [
  'identity',
]) {}

export enum UniqueUserFields {
  username = 'username',
  email = 'email',
  phone = 'phoneNumber',
}

export class UniqueCheckDto {
  @IsEnum(UniqueUserFields)
  field: UniqueUserFields;

  @IsNotEmpty()
  value: string;
}
