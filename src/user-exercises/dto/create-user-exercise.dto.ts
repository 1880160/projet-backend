import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Exercise } from "src/exercises/entities/exercise.entity"
import { User } from "src/users/user/user.entity"

export class CreateUserExerciseDto {
    @ApiProperty({example : "my-squat-for-strength-training"})
    @IsString()
    @IsNotEmpty()
    name : string
    @ApiProperty({description : "The weight of the dumbell/olympic bar/other in the exercise "})
    @IsNumber()
    weight : number
    @ApiProperty({description : "The number of repetitions between sets"})
    @IsNumber()
    repetition : number
    
    @ApiProperty({description : "The rest time between sets"})
    @IsNumber()
    restTime : number
    @ApiProperty({description : "The number of times do to the exercise"})
    @IsNumber()
    @IsOptional()
    sets : number
    @ApiProperty({description : "The time of in which the user 'executes' the exercise, 0 if it's an exercise which doesn't need a timed execution"})
    @IsNumber()
    executionTime : number
    
    @ApiProperty({description : "The exercise in which this UserExercise refers to"})
    @IsInt()
    exerciseId : number

    @IsEmpty()
    exercise : Exercise

    @IsEmpty()
    user : User

}
