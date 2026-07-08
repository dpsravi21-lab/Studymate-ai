import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../DTOs/register.dto';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword,

          class: registerDto.class,
          province: registerDto.province,

          schoolStatus: registerDto.schoolStatus,
          subjects: registerDto.subjects,
        },
      });

      const { password: _password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      throw new InternalServerErrorException('Unable to create user account');
    }
  }
}