import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from '../DTOs/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerService.createUser(registerDto);
  }
}