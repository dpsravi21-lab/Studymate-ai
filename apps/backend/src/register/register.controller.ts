import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import type { User } from '../users';
import { RegisterDto } from 'src/DTOs/register.dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }
    @Post('register')
    register(@Body() registerDto: RegisterDto): User {
        return this.registerService.createUser(registerDto);
    }
}
