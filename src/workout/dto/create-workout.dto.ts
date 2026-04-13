import { Type } from "class-transformer"
import { IsOptional, IsString, IsNotEmpty, IsDate, IsNumber, IsEmpty, IsDateString, IsArray } from "class-validator"
import { UserExercise } from "src/user-exercises/entities/user-exercise.entity"
import { User } from "src/users/user/user.entity"

export class CreateWorkoutDto {
        @IsString()
        @IsNotEmpty()
        workoutName : string
    
        @Type(() => Date)
        @IsDate()
        weekDate : Date
    
        @IsDate()
        @Type(() => Date)
        @IsOptional()
        alertDate : Date

        /*let's extend ValidationPipe to do this in the future*/
        @IsEmpty()
        user : User


        @IsNumber({},{each : true})
        @IsOptional()
        userExercisesId : number[]

        /*this aswell for validation pipe*/
        @IsEmpty({each : true})
        userExercises : UserExercise[] = []


}
