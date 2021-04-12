import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  userName: string;

  @IsString()
  password: string;
}
