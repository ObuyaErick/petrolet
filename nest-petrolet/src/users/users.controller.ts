import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UniqueCheckDto, UpdateUserDto } from './user.dtos';
import { Public } from 'src/decorators/public.decorator';
import { PreAuthorize } from 'src/auth/authorization/authorization.decorators';
import { UserRole } from 'src/auth/authentication/authentication.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('check/unique-existence')
  @Public()
  async checkIfUserExists(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    uniqueCheckDto: UniqueCheckDto,
  ) {
    return this.userService.checkIfUserExists(uniqueCheckDto);
  }

  @Post()
  @Public()
  async create(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async index() {
    return this.userService.findAll();
  }

  @Get('index/brief')
  @Public()
  async indexBrief() {
    return this.userService.briefUsers();
  }

  @Get(':id')
  async show(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for user ID'),
      }),
    )
    id: string,
  ) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @PreAuthorize<UserRole>({ tokens: [{ name: 'ROLE_ADMIN' }] })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for user ID'),
      }),
    )
    id: string,
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser({
      where: { id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  @PreAuthorize<UserRole>({ tokens: [{ name: 'ROLE_ADMIN' }] })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for user ID'),
      }),
    )
    id: string,
  ) {
    return this.userService.deleteUser(id);
  }
}
