import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto, UniqueCheckDto } from './user.dtos';
import { PasswordService } from 'src/password/password.service';
import { GrantedAuthority } from 'src/auth/authentication/authentication.guard';
import { OtpService } from 'src/otp/otp.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private otpService: OtpService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async checkIfUserExists(uniqueCheckDto: UniqueCheckDto) {
    return {
      exists: !!(await this.prisma.user.findFirst({
        where: {
          [uniqueCheckDto.field]: uniqueCheckDto.value,
        },
      })),
    };
  }

  async findByUsernameOrEmailOrPhoneNumber(identity: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: identity },
          { email: identity },
          { phoneNumber: identity },
        ],
      },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return users;
  }

  async briefUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
      },
    });
    return users;
  }

  async findById(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, username, email, phoneNumber, password } =
      createUserDto;
    const userInput: Prisma.UserCreateInput = {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      passwordDigest: PasswordService.hashedPassword(password),
    };

    // User registration transaction
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: userInput,
      });

      const host = this.configService.get<string>('VUE_FRONTEND');
      const url = `${host}$`;

      const otp = await tx.oneTimePassword.upsert({
        where: { userId: user.id },
        update: {
          createdAt: new Date().toISOString(),
        },
        create: {
          value: this.otpService.generateOTP(6),
          userId: user.id,
        },
      });

      // Send mail
      await this.mailService.sendInitialRegistrationOtp({
        options: {
          subject: 'Reset your password',
          to: user.email,
          template: 'initial-registration',
        },
        context: {
          otp: otp.value,
          uiURL: url,
          name: user.firstName,
        },
      });

      return {
        message:
          'Thank you for signing up. Check your email for an otp to activate your account.',
      };
    });
  }

  async updateUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: Prisma.UserUpdateInput;
    },
    transactionClient?: Prisma.TransactionClient,
  ): Promise<User> {
    const updateUser = await (transactionClient || this.prisma).user.update({
      where: params.where,
      data: params.data,
    });
    return updateUser;
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return null;
  }

  async ensureAllExist(userIds: string[]) {
    for (let userId of userIds) {
      try {
        this.ensureExistsById(userId);
      } catch (e) {
        throw new NotFoundException('Some user does not exist.');
      }
    }
  }

  async ensureExistsById(userId: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }

  async getAuthoritiesByUserId(id: string): Promise<GrantedAuthority[]> {
    return await this.prisma.role.findMany({
      where: {
        userRoles: {
          some: {
            userId: id,
          },
        },
      },
    });
  }

  async getAuthorities(user: User): Promise<GrantedAuthority[]> {
    return await this.getAuthoritiesByUserId(user.id);
  }
}
