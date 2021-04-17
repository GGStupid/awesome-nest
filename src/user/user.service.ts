import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  async login(updateUserDto: UpdateUserDto) {
    const isExist = await this.repo.findOne({
      userName: updateUserDto.userName,
    });
    if (!isExist) {
      throw new HttpException('用户名未注册', HttpStatus.NOT_FOUND);
    }
    if (isExist.password !== updateUserDto.password) {
      throw new HttpException('密码错误，请重试', HttpStatus.FORBIDDEN);
    }
    return isExist;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  findOneByUserName(userName: string) {
    return this.repo.findOne({ userName: userName });
  }

  getByEmail(email: string) {
    return this.repo.findOne({email})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
