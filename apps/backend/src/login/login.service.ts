import { Injectable } from '@nestjs/common';
import users, { type User } from '../users';
import type { LoginDto } from '../DTOs/login.dto';
import type { UpdateUserDto } from '../DTOs/update-user.dto';

@Injectable()
export class LoginService {
    private users: User[] = users;

    getUsers(): User[] {
        return this.users.map((user) => ({
            ...user,
        }));
    }

    login(loginDto: LoginDto): User | undefined {
        return this.users.find(
            (user) => user.email === loginDto.email && user.password === loginDto.password,
        );
    }

    updateUser(id: string, updateUser: UpdateUserDto): User | undefined {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return undefined;
        }

        const updatedUser = {
            ...this.users[userIndex],
            ...updateUser,
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    private generateRandomId(): string {
        return Array.from({ length: 12 }, () =>
            Math.random().toString(36).charAt(2),
        ).join('');
    }
}

