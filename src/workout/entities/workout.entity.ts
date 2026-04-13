import { UserExercise } from "src/user-exercises/entities/user-exercise.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/user/user.entity";
@Entity()
export class Workout {

    @PrimaryGeneratedColumn()
    workoutId : number

    @Column()
    workoutName : string

    @Column()
    weekDate : Date

    @Column({nullable: true})
    alertDate : Date

    @ManyToMany(() => UserExercise,{onDelete : "CASCADE"})
    @JoinTable()
    userExercises : UserExercise[]

    @ManyToOne(() => User, (user) => user.userId,{onDelete : "CASCADE"})
    user : User

}
