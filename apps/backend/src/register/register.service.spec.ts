import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class { },
}));

import { RegisterService } from './register.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let prisma: { user: { findUnique: jest.Mock; create: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('hashes the password before creating a user', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: '1', password: 'hashed' });

    await service.createUser({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'plain-password',
      class: '10',
      province: 'Western',
      schoolStatus: 'student',
      subjects: ['Math'],
    });

    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          password: expect.any(String),
        }),
      }),
    );
    expect(prisma.user.create.mock.calls[0][0].data.password).not.toBe('plain-password');
  });

  it('throws a conflict error when the email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1' });

    await expect(
      service.createUser({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'plain-password',
        class: '10',
        province: 'Western',
        schoolStatus: 'student',
        subjects: ['Math'],
      }),
    ).rejects.toThrow(ConflictException);
  });
});
