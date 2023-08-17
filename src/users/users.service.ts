import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { id, name, username, usertype, email, password, products } =
      createUserDto;

    // Crie o usuário no banco de dados
    const user = await this.prisma.user.create({
      data: {
        id,
        name,
        username,
        usertype,
        email,
        password,
        products: { connect: products.map((productId) => ({ id: productId })) }, // Conecta os produtos ao usuário
      },
      include: {
        products: true, // Inclui os produtos associados ao usuário no resultado
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        id: 'asc', // Ordena os usuários pelo ID de forma crescente (ascendente)
      },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, username, usertype, email, password } = updateUserDto;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        username,
        usertype,
        email,
        password,
      },
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
