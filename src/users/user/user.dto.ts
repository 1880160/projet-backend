import { Injectable } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : String


    @IsEmail()
    email : String

    @IsStrongPassword()
    @IsNotEmpty()
    password: String
}

export class UpdateUserDto {

    @IsString()
    username : String


    @IsEmail()
    email : String

    @IsStrongPassword()
    password: String
    
}
export class SignInUserDTO {
    @IsString()
    username : String

    @IsString()
    password: String
}


export class PublicResponseUserDTO {
    @Expose()
    id : number
    @Expose()
    email : string
}
