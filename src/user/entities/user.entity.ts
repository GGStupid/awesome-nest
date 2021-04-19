// import { BaseEntity } from '../../model/base.entity';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;
}
