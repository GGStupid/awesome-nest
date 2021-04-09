import { BaseEntity } from '../../model/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  age: number;
}
