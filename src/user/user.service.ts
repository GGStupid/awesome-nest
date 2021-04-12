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
    // user.createDateTime = new Date();
    // user.createdBy = createUserDto.userName;
    // user.lastChangedBy = createUserDto.userName;
    // user.lastChangedDateTime = new Date();
    return this.repo.save(user);
  }

  login(createUserDto: CreateUserDto) {
    return;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
