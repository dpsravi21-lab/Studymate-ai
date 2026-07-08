import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../DTOs/login.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Get()
  async getUsers() {
    return await this.loginService.getUsers();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.loginService.updateUser(id, updateUserDto);
  }
}