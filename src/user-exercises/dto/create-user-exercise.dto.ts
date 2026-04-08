import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Exercise } from "src/exercises/entities/exercise.entity"
import { User } from "src/users/user/user.entity"

export class CreateUserExerciseDto {
    
    @IsString()
    @IsNotEmpty()
    name : string
    
    @IsNumber()
    weight : number
    
    @IsNumber()
    repetition : number
    
    @IsNumber()
    restTime : number
    
    @IsNumber()
    executionTime : number
    
    @IsInt()
    exerciseId : number

    @IsEmpty()
    exercise : Exercise

    @IsEmpty()
    user : User

}
