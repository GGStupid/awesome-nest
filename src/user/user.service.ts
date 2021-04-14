import { Injectable } from '@nestjs/common';
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

  create(createUserDto: CreateUserDto) {
    let user = new User();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    // user.createDateTime = new Date();
    // user.createdBy = createUserDto.userName;
    // user.lastChangedBy = createUserDto.userName;
    // user.lastChangedDateTime = new Date();
    return this.repo.save(user);
  }

  async login(updateUserDto: UpdateUserDto) {
    const isExist = await this.repo.findOne({
      userName: updateUserDto.userName,
      password: updateUserDto.password,
    });
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
