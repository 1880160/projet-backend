import { isObject } from "class-validator";
import { CreateExerciseDto } from "src/exercises/dto/create-exercise.dto";
import { User } from "src/users/user/user.entity";
import { Column } from "typeorm";

export class CreateExerciseRequestDto extends CreateExerciseDto{
    
    @Column()
    user : User
}