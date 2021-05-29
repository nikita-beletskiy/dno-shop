import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  constructor() {
    this.id = '';
    this.email = '';
    this.password = '';
    this.first_name = '';
    this.last_name = '';
    this.nickname = '';
    this.phone = '';
    this.date_of_birth = '';
    this.gender = '';
    this.image = '';
    this.wishlist = [];
    this.cart = [];
  }

  static readonly maxEmailLength = 100;
  static readonly maxPasswordLength = 128;
  static readonly maxFirstNameLength = 50;
  static readonly maxLastNameLength = 50;
  static readonly maxNicknameLength = 20;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: User.maxEmailLength, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: User.maxFirstNameLength })
  first_name: string;

  @Column({ type: 'varchar', length: User.maxLastNameLength })
  last_name: string;

  @Column({
    type: 'varchar',
    length: User.maxNicknameLength,
    unique: true,
    nullable: true
  })
  nickname: string;

  @Column({ type: 'varchar', length: 10, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'uuid', array: true, default: [], nullable: true })
  wishlist: string[];

  @Column({ type: 'uuid', array: true, default: [], nullable: true })
  cart: string[];

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }
}
