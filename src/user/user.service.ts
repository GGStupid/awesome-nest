import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.repo.update(userId, { currentHashedRefreshToken });
  }

  

  async getById(id: number) {
    const user = await this.repo.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
  }

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
    return this.repo.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
