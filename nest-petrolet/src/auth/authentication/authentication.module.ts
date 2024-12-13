import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtpService } from 'src/otp/otp.service';
import { PasswordService } from 'src/password/password.service';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
  providers: [
    AuthenticationService,
    UsersService,
    PrismaService,
    OtpService,
    PasswordService,
  ],
})
export class AuthenticationModule {}
