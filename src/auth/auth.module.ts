import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'sua-chave-secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
