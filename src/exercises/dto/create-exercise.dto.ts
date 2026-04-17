import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString, } from "class-validator";
export class CreateExerciseDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        name: string;
        @ApiProperty({
                examples: [
                        "static",
                        "pull",
                        "push"
                ]
        })
        @IsString()
        @IsNotEmpty()
        force: string;
        @ApiProperty({
                examples: [
                        "beginner",
                        "intermediate",
                        "expert"
                ]
        })
        @IsString()
        @IsNotEmpty()
        level: string;
        @ApiProperty({
                examples: [
                        "isolation",
                        "compound",
                        null

                ]
        })
        @IsString()
        @IsNotEmpty()
        mechanic: string;
        @ApiProperty({
                examples: [
                        null,
                        "medicine ball",
                        "dumbbell",
                        "body only",
                        "bands",
                        "kettlebells",
                        "foam roll",
                        "cable",
                        "machine",
                        "barbell",
                        "exercise ball",
                        "e-z curl bar",
                        "other"
                ]
        })
        @IsString()
        equipment: string
        @ApiProperty({
                examples: [
                        "abdominals",
                        "abductors",
                        "adductors",
                        "biceps",
                        "calves",
                        "chest",
                        "forearms",
                        "glutes",
                        "hamstrings",
                        "lats",
                        "lower back",
                        "middle back",
                        "neck",
                        "quadriceps",
                        "shoulders",
                        "traps",
                        "triceps"
                ]
        })
        @IsArray()
        primaryMuscles: string[]
        @ApiProperty({
                examples: [
                        "abdominals",
                        "abductors",
                        "adductors",
                        "biceps",
                        "calves",
                        "chest",
                        "forearms",
                        "glutes",
                        "hamstrings",
                        "lats",
                        "lower back",
                        "middle back",
                        "neck",
                        "quadriceps",
                        "shoulders",
                        "traps",
                        "triceps"
                ]
        })
        @IsArray()
        secondaryMuscles: string[]

        @ApiProperty()
        @IsArray()
        instructions: string[]
        @ApiProperty({
                examples: [
                        "powerlifting",
                        "strength",
                        "stretching",
                        "cardio",
                        "olympic weightlifting",
                        "strongman",
                        "plyometrics"
                ]
        })
        @IsString()
        @IsNotEmpty()
        category: string


}
