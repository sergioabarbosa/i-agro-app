import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  generateToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
