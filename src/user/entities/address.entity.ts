import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;
}

export default Address;
