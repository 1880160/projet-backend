import { User } from "src/users/user/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    notificationId : number
    @Column()
    message : string
    @Column({nullable : true})
    context : string
    @ManyToOne(() => User, (user) => user.userId,{onDelete : "CASCADE"})
    user : User
}
