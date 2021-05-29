import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  constructor() {
    this.id = '';
    this.category = '';
    this.title = '';
    this.description = '';
    this.price = '';
    this.quantity = 0;
    this.images = [];
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'money' })
  price: string;

  @Column({ type: 'smallint', default: 0 })
  quantity: number;

  @Column({ type: 'text', array: true, default: [], nullable: true })
  images: string[];
}
