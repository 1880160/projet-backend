import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user/user.dto';

@Injectable()
export class UsersService {
 private readonly logger = new Logger(UsersService.name, { timestamp: true });

    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){}

  async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User | String> {
    return this.userRepository.findOneByOrFail({ userId }).catch(
      () => {
        const message : String =  `couldn't find user with id ${userId}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }
  async findByName(username : String) : Promise<User | null>{
    return this.userRepository.findOneByOrFail({ username }).catch(
      () =>
      {
        const message : String =  `couldn't find user with name :  ${username}`;
        this.logger.warn(message, this)
        return null;
      }
    )
  }


  async createUser( createUserDto: CreateUserDto) : Promise<User>{
    const newUser : User = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }


  async updateUser(userId: number, updateUserDto: Partial<UpdateUserDto>) {
    return this.userRepository.update(userId,updateUserDto)
  }

  async deleteUser(id: number) {
    return this.userRepository.delete({userId : id})
  }

}
