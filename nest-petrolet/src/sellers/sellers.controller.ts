import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { SellersService } from './sellers.service';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PreAuthorize } from 'src/auth/authorization/authorization.decorators';
import { UserRole } from 'src/auth/authentication/authentication.guard';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Request() req: ExpressRequest) {
    return this.sellersService.create(req.authentication?.principal!!);
  }

  @Get()
  @PreAuthorize<UserRole>({ tokens: [{ name: 'ROLE_ADMIN' }] })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @PreAuthorize<UserRole>({ tokens: [{ name: 'ROLE_ADMIN' }] })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller ID'),
      }),
    )
    id: string,
  ) {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller ID'),
      }),
    )
    id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid id format for seller ID'),
      }),
    )
    id: string,
  ) {
    return this.sellersService.remove(id);
  }
}
