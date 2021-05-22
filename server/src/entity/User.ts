import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  static readonly maxEmailLength = 100;
  static readonly maxPasswordLength = 128;
  static readonly maxFirstNameLength = 50;
  static readonly maxLastNameLength = 50;
  static readonly maxNicknameLength = 20;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: User.maxEmailLength, unique: true })
  email: string | undefined;

  @Column({ type: 'text' })
  password: string | undefined;

  @Column({ type: 'varchar', length: User.maxFirstNameLength })
  first_name: string | undefined;

  @Column({ type: 'varchar', length: User.maxLastNameLength })
  last_name: string | undefined;

  @Column({
    type: 'varchar',
    length: User.maxNicknameLength,
    unique: true,
    nullable: true
  })
  nickname: string | undefined;

  @Column({ type: 'varchar', length: 10, unique: true, nullable: true })
  phone: string | undefined;

  @Column({ type: 'date', nullable: true })
  date_of_birth: string | undefined;

  @Column({ type: 'varchar', length: 6, nullable: true })
  gender: string | undefined;

  @Column({ type: 'text', nullable: true })
  image: string | undefined;

  @Column({ type: 'uuid', array: true, default: [], nullable: true })
  wishlist: string[] | undefined;

  @Column({ type: 'uuid', array: true, default: [], nullable: true })
  cart: string[] | undefined;

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }
}
