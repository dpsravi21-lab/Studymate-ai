import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import type { User } from './login.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @Post('register')
    register(@Body() registerDto: RegisterDto): User {
        return this.loginService.createUser(registerDto);
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