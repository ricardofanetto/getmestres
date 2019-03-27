import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { RequestOrder } from './RequestOrder';
import { Question } from './Question';

@Entity({ name: 'RequestAnswer' })
export class RequestOrderAnswer extends BaseEntity {

  @Column({ type: 'text', nullable: false })
  answer: string

  @ManyToOne(() => RequestOrder, { eager: true }) //AutoPopulate
  requestOrder: RequestOrder
  
  @ManyToOne(() => Question, { eager: true }) //AutoPopulate
  question: Question

}