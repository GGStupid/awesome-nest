// import { BaseEntity } from '../../model/base.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';
import Post from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  public currentHashedRefreshToken?: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}
