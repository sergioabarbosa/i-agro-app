import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service'; // Verifique a importação correta aqui

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService], // Certifique-se de fornecer o PrismaService aqui
})
export class UsersModule {}
