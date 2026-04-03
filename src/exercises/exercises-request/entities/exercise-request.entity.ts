import { Exercise } from "src/exercises/entities/exercise.entity";
import { User } from "src/users/user/user.entity";
import { Entity, ManyToOne } from "typeorm";
@Entity()
export class ExerciseRequest extends Exercise {

    @ManyToOne(() => User, (user) => user.userId,{onDelete : "CASCADE"})
    user : User
}