// import { BaseEntity } from '../../model/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ unique: true })
  userName: string;

  @ApiProperty({ description: '密码' })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  @Exclude()
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  @Exclude()
  updateTime: Date;
}
