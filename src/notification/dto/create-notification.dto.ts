import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "src/users/user/user.entity"

export class CreateNotificationDto {

    @ApiProperty({
        description: "Notification's message"
    })
    @IsString()
    @IsNotEmpty()
    message: string

    @ApiProperty({
        description: "Context of this notification's message",
        example: "WORKOUT"
    })
    @IsString()
    @IsOptional()
    context?: string

    /*let's extend ValidationPipe to do this in the future*/
    @IsEmpty()
    user?: User

    @ApiProperty({
        description: "user which this notification belongs to"
    })
    @IsNumber()
    userId : number



}
