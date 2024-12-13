import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OtpService } from 'src/otp/otp.service';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersService, OtpService, MailService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
