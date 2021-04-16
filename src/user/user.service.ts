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

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.repo.findOne({
      userName: createUserDto.userName,
    });
    console.log(isExist);
    if (isExist) {
      throw new HttpException('用户名已注册', HttpStatus.NOT_ACCEPTABLE);
    }

    let user = new User();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    return this.repo.save(user);
  }

  async login(updateUserDto: UpdateUserDto) {
    const isExist = await this.repo.findOne({
      userName: updateUserDto.userName,
    });
    if (isExist) {
      throw new HttpException('用户名已注册', HttpStatus.NOT_ACCEPTABLE);
    }
    console.log(isExist);
    if (isExist) return isExist;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
