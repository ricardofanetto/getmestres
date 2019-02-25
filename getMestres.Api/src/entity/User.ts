import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: 'User' })
export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 200 })
    photo: string;

    @Column({ type: 'varchar', length: 200 })
    email: string;

    @Column({ default: false })
    isRoot: boolean;

    @Column({ type: 'varchar', length: 100 })
    password: string;

}


