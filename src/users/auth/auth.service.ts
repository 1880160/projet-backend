import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { promisify } from 'util';
import { CreateUserDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../user/hashing/user.hash';
const saltRounds = 10;

@Injectable()
export class AuthService {


     private readonly logger = new Logger(AuthService.name, { timestamp: true });


    constructor(private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }



    async signIn(username : String, password : String) :  Promise<{ access_token: string }>{
        const user = await this.usersService.findByName(username)
        if (!user){
            throw new BadRequestException(`cannot find name : ${username}`,)
        }

        if (user?.password !== hashPassword(password)){
            this.logger.warn(`${password}`)
            throw new UnauthorizedException()
        }

    const payload = { sub: user.userId, username: user.username };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    }
    }

    async refreshToken(userId : number){
        const user = await this.usersService.findOne(userId);
        if (user instanceof String){
            throw new BadRequestException(user);
        }
        const payload = { sub: user.userId, username: user.username };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    }
    }
    async signUp(createUserDto : CreateUserDto){
        const similarUser = await this.usersService.findByName(createUserDto.username)
    this.logger.log(similarUser,this);
        if (  similarUser != null) {
        throw new BadRequestException("Already an user with this name");
    }
    return await this.usersService.createUser(createUserDto);

}
}

