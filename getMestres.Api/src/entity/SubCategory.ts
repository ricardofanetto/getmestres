import { Category } from './Category';
import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";

@Entity({ name: 'SubCategory' })
export class SubCategory extends BaseEntity {

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column()
  cost: number

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string

  @ManyToOne(() => Category, { eager: true }) //AutoPopulate
  category: Category

}
