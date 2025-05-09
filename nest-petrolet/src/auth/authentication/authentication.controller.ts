import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import {
  AuthenticatedOtpRequest,
  PasswordResetDto,
  PasswordResetRequestDto,
  PublicOtpRequest,
  SignInDto,
  VerifyLoginDto,
} from 'src/users/user.dtos';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';

export const SESSION_KEY = 'session';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signin')
  @Public()
  async signIn(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const sign = await this.authenticationService.signIn(signInDto);

    response.cookie(SESSION_KEY, sign.access_token, {
      httpOnly: true,
      // Cookie to be sent over https in production environment
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      // Cookie expires after an hour
      maxAge: 60 * 60 * 1000 * 24,
      // Prevent CSRF
      sameSite: 'lax',
    });

    return {
      message: 'Signed in successfully.',
    };
  }

  @Post('verify-login')
  @Public()
  async verifyLogin(
    @Body()
    verifyLoginDto: VerifyLoginDto,
  ) {
    return await this.authenticationService.verifyLogin(verifyLoginDto);
  }

  @Get('current-user')
  currentUser(@Request() req: ExpressRequest) {
    return {
      principal: req.authentication?.principal,
      authorities: req.authentication?.authorities,
      initials: req.authentication?.initials,
    };
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) response: Response) {
    // Clear the 'session' cookie
    response.clearCookie(SESSION_KEY, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
    });

    return {
      message: 'Logout successful',
    };
  }

  @Public()
  @Post('request-password-reset')
  async passwordResetRequest(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    passwordResetRequestDto: PasswordResetRequestDto,
  ) {
    return await this.authenticationService.passwordResetRequest(
      passwordResetRequestDto,
    );
  }

  @Post('request-otp/public')
  @Public()
  async requestOtpPublic(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    publicOtpRequest: PublicOtpRequest,
  ) {
    return await this.authenticationService.requestOtpPublic(publicOtpRequest);
  }

  @Post('request-otp/authenticated')
  async requestOtpAuthenticated(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    authenticatedOtpRequest: AuthenticatedOtpRequest,
    @Request() req: ExpressRequest,
  ) {
    return await this.authenticationService.requestOtpAuthenticated(
      authenticatedOtpRequest,
      req.authentication?.principal!!,
    );
  }

  @Public()
  @Post('reset-password')
  async passwordReset(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    passwordResetDto: PasswordResetDto,
  ) {
    return await this.authenticationService.passwordReset(passwordResetDto);
  }
}
