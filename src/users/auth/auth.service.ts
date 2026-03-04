import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt, hash } from 'crypto'; // Pour générer notre salt
import { promisify } from 'util';
import { CreateUserDto } from '../user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
const scrypt = promisify(_scrypt);


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

        if (user?.password !== password){
            this.logger.warn(`${password}`)
            throw new UnauthorizedException()
        }

    const payload = { sub: user.id, username: user.name };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    }
    }


//     async signOut() {
//     return "uwuw out"
// }
    async singUp(createUserDto : CreateUserDto){
    if (this.usersService.findByName(createUserDto.name) != null) {
        throw new BadRequestException("Already an user with this name");
    }
    return this.usersService.create(createUserDto);

}
}

