import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { UserRole } from "./user-role/user-roles.enum";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({
        example: "John"
    })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({
        example : "john@workout.com"
    })
    @IsEmail()
    email: string
    @ApiProperty({
        example : "Very12Secure&^Password^"
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string



}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty(
        {example : 1,
            enum : UserRole
        }
    )
    @IsEnum(UserRole)
    userType : UserRole

}
export class SignInUserDTO {
    @ApiProperty({
    example: "John"
    })
    @IsString()
    username: String
    @ApiProperty({
        example : "Very12Secure&^Password^"
    })
    @IsString()
    password: String
}


export class PublicResponseUserDTO {
    @Expose()
    userId: number
    @Expose()
    email: string
    @Expose()
    username : String
}
