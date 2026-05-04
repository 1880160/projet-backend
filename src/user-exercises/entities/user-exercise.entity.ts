import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user/user.entity";
import { Exercise } from "src/exercises/entities/exercise.entity";
@Entity()
export class UserExercise {
@PrimaryGeneratedColumn()
userExerciseId : number

@Column()
name : string

@Column()
weight : number

@Column()
repetition : number

@Column({default : 3})
sets : number

@Column()
restTime : number

@Column({default : 0})
executionTime : number

@ManyToOne(() => User, (user) => user.userId,{onDelete : "CASCADE", onUpdate : "CASCADE"})
user : User

@ManyToOne(() => Exercise, (exercise) => exercise.exerciseId,{onDelete : "CASCADE", onUpdate: "CASCADE"})
exercise : Exercise

}
