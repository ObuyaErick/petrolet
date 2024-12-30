import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from './otp/otp.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { AuthorizationModule } from './auth/authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/authorization/roles.guard';
import { PasswordService } from './password/password.service';
import { AuthenticationGuard } from './auth/authentication/authentication.guard';
import { RolesModule } from './roles/roles.module';
import { ListingsModule } from './listings/listings.module';
import { MpesaModule } from './mpesa/mpesa.module';
import { PaginationModule } from './pagination/pagination.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SellersModule } from './sellers/sellers.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.development.env'],
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        FRONTEND_HOST: Joi.string().required(),
        MAIL_SERVICE: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().port().default(465),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().default(
          '"Support Team" <support@petrolet.com>',
        ),
        //.default('noreply@example.com'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${3600 * 24}s`,
          algorithm: 'HS512',
        },
      }),
    }),
    PrismaModule,
    OtpModule,
    UsersModule,
    AuthenticationModule,
    AuthorizationModule,
    MailModule,
    RolesModule,
    ListingsModule,
    MpesaModule,
    PaginationModule,
    ReviewsModule,
    SellersModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PasswordService
  ],
})
export class AppModule {}
