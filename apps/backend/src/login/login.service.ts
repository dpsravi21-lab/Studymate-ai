import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';

import { LoginDto } from '../DTOs/login.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) { }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = updateUser.password
      ? await bcrypt.hash(updateUser.password, 10)
      : existingUser.password;

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: updateUser.name,
        email: updateUser.email,
        password: hashedPassword,

        class: updateUser.class,
        province: updateUser.province,

        schoolStatus: updateUser.schoolStatus,
        subjects: updateUser.subjects,
      },
    });

    const { password: _password, ...safeUser } = updatedUser;
    return safeUser;
  }
}