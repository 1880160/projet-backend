import { AfterInsert, Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";
import { Exclude } from "class-transformer";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : String


    @Column()
    email : String

    @Column()
    @Exclude()
    password : String

    @AfterInsert()
    logInsert(){
        console.log(`User with ID ${this.id} has been created`)
    }
}