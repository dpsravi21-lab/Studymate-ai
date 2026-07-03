import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import type { User } from '../users';
import { LoginDto } from '../DTOs/login.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Get()
    getuser(): User[] {
        return this.loginService.getUsers();
    }

    @Post()
    login(@Body() loginDto: LoginDto): User {
        const user = this.loginService.login(loginDto);
        if (!user) {
            throw new NotFoundException('Invalid login credentials');
        }
        return user;
    }



    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
        const user = this.loginService.updateUser(id, updateUserDto);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}