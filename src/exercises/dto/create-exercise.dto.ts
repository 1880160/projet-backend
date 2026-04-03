import { IsArray, IsEmail, IsNotEmpty, IsString, } from "class-validator";
export class CreateExerciseDto {

        @IsString()
        @IsNotEmpty()
        name : string;
    
        @IsString()
        @IsNotEmpty()
        force : string;
    
        @IsString()
        @IsNotEmpty()
        level : string;
    
        @IsString()
        @IsNotEmpty()
        mechanic : string;
    
        @IsString()
        equipment : string
    
        @IsArray()
        primaryMuscles: string[]
    
        @IsArray()
        secondaryMuscles : string[]
    
        @IsArray()
        instructions : string[]

        @IsNotEmpty()
        @IsNotEmpty()
        category : string
    

}
