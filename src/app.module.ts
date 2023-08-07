import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from '../prisma/prisma.service'; // Verifique a importação correta aqui
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, UsersService, AuthService], // Certifique-se de fornecer o PrismaService aqui
})
export class AppModule {}
