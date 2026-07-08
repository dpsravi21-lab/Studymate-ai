import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class { },
}));

import { LoginService } from './login.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LoginService', () => {
  let service: LoginService;
  let prisma: { user: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('authenticates a user with the correct password', async () => {
    const hashedPassword = await bcrypt.hash('correct-password', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'alice@example.com',
      password: hashedPassword,
    });

    const result = await service.login({
      email: 'alice@example.com',
      password: 'correct-password',
    });

    expect(result.email).toBe('alice@example.com');
  });

  it('throws unauthorized when the password is invalid', async () => {
    const hashedPassword = await bcrypt.hash('correct-password', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'alice@example.com',
      password: hashedPassword,
    });

    await expect(
      service.login({
        email: 'alice@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
