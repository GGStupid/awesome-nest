import { IsEmail, IsNotEmpty } from 'class-validator';

export class UploadCreateDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
