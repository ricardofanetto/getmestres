import { ServiceProvider } from './ServiceProvider';
import { Customer } from './Customer';
import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { RequestStatus } from "./enum/RequestStatus";
import { SubCategory } from './SubCategory';

@Entity({ name: 'Request' })
export class RequestOrder extends BaseEntity {

  @Column({ type: 'varchar', length: 100 })
  longlat: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  statusOrder: RequestStatus;

  @ManyToOne(() => Customer, { eager: true }) //AutoPopulate
  customer: Customer
  
  @ManyToOne(() => SubCategory, { eager: true }) //AutoPopulate
  subCategory: SubCategory

  @ManyToOne(() => ServiceProvider, { eager: true, nullable: true }) //AutoPopulate
  serviceProvider: ServiceProvider

}