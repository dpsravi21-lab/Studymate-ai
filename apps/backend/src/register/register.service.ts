import { Injectable } from '@nestjs/common';
import users, { type User } from '../users';
import { RegisterDto } from '../DTOs/register.dto';

@Injectable()
export class RegisterService {
    private users: User[] = users;

    createUser(user: RegisterDto): User {
        const newUser: User = {
            ...user,
            id: this.generateRandomId(),
        };

        this.users.push(newUser);
        return newUser;
    }

    private generateRandomId(): string {
        return Array.from({ length: 12 }, () =>
            Math.random().toString(36).charAt(2),
        ).join('');
    }
}
