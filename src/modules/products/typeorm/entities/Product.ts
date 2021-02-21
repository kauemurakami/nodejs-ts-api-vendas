import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column() //string tipo padrao
  name: string;
  @Column('decimal')
  price: number;
  @Column('decimal')
  quantity: number;
  @CreateDateColumn('timestamp')
  created_at: Date;
  @UpdateDateColumn('timestamp')
  updated_at: Date;
}
export default Product;
