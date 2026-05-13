import { User } from "src/users/user/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm"

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    notificationId: number
    @Column()
    title: string
    @Column()
    message: string
    @Column({ nullable: true })
    context: string
    @Column()
    notifcationDate: Date
    @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
    user: User
    @BeforeInsert()
    beforeInsert() {
        this.notifcationDate = new Date();
    }
}
