import { IsEmail, IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsNumber()
    @IsNotEmpty()
    class!: number;

    @IsString()
    @IsNotEmpty()
    province!: string;

    @IsString()
    @IsNotEmpty()
    schoolStatus!: string;

    @IsArray()
    @IsNotEmpty()
    subjects!: string[];
}
