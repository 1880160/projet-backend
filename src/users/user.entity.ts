import { AfterInsert, Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";
import { Exclude } from "class-transformer";
import { IsBoolean } from "class-validator";
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

    @Exclude()
    @Column({default : false})
    @IsBoolean()
    admin : boolean


    @AfterInsert()
    logInsert(){
        console.log(`User with ID ${this.id} has been created`)
    }
}