import { AfterInsert, BeforeInsert, BeforeUpdate, AfterUpdate, Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";
import { Exclude } from "class-transformer";
import { IsBoolean, IsEnum } from "class-validator";
import { UserRole } from "./user-role/user-roles.enum";
import { hashPassword } from "./hashing/user.hash";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId : number;

    @Column()
    username : String


    @Column()
    email : String

    @Column()
    @Exclude()
    password : String

    @Exclude()
    @Column({default : UserRole.USER})
    @IsEnum(UserRole)
    userType : UserRole

    @AfterInsert()
    logInsert(){
        console.log(`User with ID ${this.userId} has been created`)
    }
    @BeforeInsert()
    beforeInsert() {
        this.password = hashPassword(this.password)
    }
    @AfterUpdate()
    afterUpdater() {
        this.password = hashPassword(this.password)
    }
}