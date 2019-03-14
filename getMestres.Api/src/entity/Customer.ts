import { BaseEntity } from "./BaseEntity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'Customer' })
export class Customer extends BaseEntity {


  @Column({ type: 'varchar', length: 200 })
  name: string
  
  @Column({ type: 'varchar', length: 200 })
  email: string
  
  @Column({ type: 'varchar', length: 200 })
  photo: string
  
  @Column({ type: 'varchar', length: 100 })
  password: string
  
  @Column({ type: 'varchar', length: 50 })
  phone: string

}