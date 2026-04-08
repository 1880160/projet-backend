import { IsObject, isObject } from "class-validator";
import { CreateExerciseDto } from "src/exercises/dto/create-exercise.dto";
import { User } from "src/users/user/user.entity";

export class CreateExerciseRequestDto extends CreateExerciseDto{
    
    user : User
}