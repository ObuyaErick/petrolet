import { Injectable } from '@nestjs/common';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Principal } from 'src/auth/authentication/authentication.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SellersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(loggedInPrincipal: Principal) {
    return await this.prisma.seller.create({
      data: {
        userId: loggedInPrincipal.id,
      },
    });
  }

  async findAll() {
    return await this.prisma.seller.findMany();
  }

  async findOne(id: string) {
    return await this.ensureExistsById(id);
  }

  update(id: string, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  async remove(id: string) {
    await this.prisma.seller.delete({
      where: { id },
    });
    return null;
  }

  async ensureExistsById(id: string) {
    return await this.prisma.seller.findUniqueOrThrow({
      where: { id },
    });
  }
}
