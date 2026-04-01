import { Injectable } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsEnum, IsNumber, IsString, IsStrongPassword } from "class-validator";
import bcrypt from "bcryptjs";
import { BeforeInsert, Unique } from "typeorm";
import {hashPassword} from "./hashing/user.hash";
import { PartialType } from "@nestjs/mapped-types";
import { UserRole } from "./user-role/user-roles.enum";
export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string


    @IsEmail()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string



}

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsEnum(UserRole)
    userType : UserRole

}
export class SignInUserDTO {
    @IsString()
    username: String

    @IsString()
    password: String
}


export class PublicResponseUserDTO {
    @Expose()
    id: number
    @Expose()
    email: string
}
