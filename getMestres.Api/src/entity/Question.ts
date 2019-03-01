import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { QuestionType } from "./enum/QuestionType";
import { SubCategory } from "./SubCategory";

@Entity({ name: 'Question' })
export class Question extends BaseEntity {


  @Column({ type: 'varchar', length: 200 })
  question: string;

  @Column()
  type: QuestionType;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  options: string;


  @ManyToOne(() => SubCategory, { eager: true })
  subCategory: SubCategory;

}