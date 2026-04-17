import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsString, IsNotEmpty, IsDate, IsNumber, IsEmpty, IsDateString, IsArray } from "class-validator"
import { UserExercise } from "src/user-exercises/entities/user-exercise.entity"
import { User } from "src/users/user/user.entity"

export class CreateWorkoutDto {
        @ApiProperty(
                {example : "Leg day"}
        )
        @IsString()
        @IsNotEmpty()
        workoutName : string
        @ApiProperty({
        description : "Day / of the workout"

        })
        @Type(() => Date)
        @IsDate()
        weekDate : Date
        @ApiProperty({
        description : "Time to alert for the next workout"
        })
        @IsDate()
        @Type(() => Date)
        @IsOptional()
        alertDate : Date

        /*let's extend ValidationPipe to do this in the future*/
        @IsEmpty()
        user : User

        @ApiProperty({
                description : "user Exercises to add to the workout"
        })
        @IsNumber({},{each : true})
        @IsOptional()
        userExercisesId : number[]

        /*this aswell for validation pipe*/
        @IsEmpty({each : true})
        userExercises : UserExercise[] = []


}
