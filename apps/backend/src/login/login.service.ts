import { Injectable } from '@nestjs/common';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    class: number;
    province: string;
    SchoolStatus: string;
    Subjects: string[];
}

@Injectable()
export class LoginService {
    private users: User[] = [
        {
            id: 'a92bbbhfe8u1',
            name: 'Amina Yusuf',
            email: 'amina.yusuf@example.com',
            password: 'password123',
            class: 10,
            province: 'Punjab',
            SchoolStatus: 'Private',
            Subjects: ['Mathematics', 'English', 'Biology'],
        },
        {
            id: 'm8d3fzqk2p7t',
            name: 'David Kimani',
            email: 'david.kimani@example.com',
            password: 'dkpass456',
            class: 11,
            province: 'Sindh',
            SchoolStatus: 'Public',
            Subjects: ['Physics', 'Chemistry', 'History'],
        },
        {
            id: 'x4v1sht9nq0b',
            name: 'Sara Mensah',
            email: 'sara.mensah@example.com',
            password: 'sara789',
            class: 9,
            province: 'Khyber Pakhtunkhwa',
            SchoolStatus: 'Private',
            Subjects: ['Mathematics', 'Geography', 'English'],
        },
        {
            id: 'k5g8uyn3zv6r',
            name: 'Michael Ade',
            email: 'michael.ade@example.com',
            password: 'mike2024',
            class: 12,
            province: 'Punjab',
            SchoolStatus: 'Public',
            Subjects: ['Economics', 'Computer', 'Physics'],
        },
        {
            id: 'b1r7qwe6hya4',
            name: 'Lina Hassan',
            email: 'lina.hassan@example.com',
            password: 'lina321',
            class: 10,
            province: 'Balochistan',
            SchoolStatus: 'Private',
            Subjects: ['Biology', 'Mathematics', 'History'],
        },
        {
            id: 'c9h4zuj2p8xq',
            name: 'Joshua Carter',
            email: 'joshua.carter@example.com',
            password: 'joshua789',
            class: 11,
            province: 'Punjab',
            SchoolStatus: 'Private',
            Subjects: ['Chemistry', 'English', 'Art'],
        },
        {
            id: 't7n6wkc1xrz5',
            name: 'Fatima Omar',
            email: 'fatima.omar@example.com',
            password: 'fatima456',
            class: 9,
            province: 'Sindh',
            SchoolStatus: 'Public',
            Subjects: ['Mathematics', 'Physics', 'French'],
        },
        {
            id: 's8q1fdz5yvn3',
            name: 'Emmanuel Boateng',
            email: 'emmanuel.boateng@example.com',
            password: 'emmanuel123',
            class: 12,
            province: 'Punjab',
            SchoolStatus: 'Private',
            Subjects: ['Biology', 'Geography', 'Mathematics'],
        },
        {
            id: 'n2w9pkr4sxt6',
            name: 'Nadia Patel',
            email: 'nadia.patel@example.com',
            password: 'nadia2024',
            class: 10,
            province: 'Sindh',
            SchoolStatus: 'Public',
            Subjects: ['English', 'History', 'Computer'],
        },
        {
            id: 'p3y7xjm8qsz4',
            name: 'Peter Mwangi',
            email: 'peter.mwangi@example.com',
            password: 'peter456',
            class: 11,
            province: 'Punjab',
            SchoolStatus: 'Private',
            Subjects: ['Physics', 'Chemistry', 'Mathematics'],
        },
    ];

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

    createUser(user: RegisterDto): User {
        const newUser: User = {
            ...user,
            id: this.generateRandomId(),
        };

        this.users.push(newUser);
        return newUser;
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

