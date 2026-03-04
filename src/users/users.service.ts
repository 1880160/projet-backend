import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
 private readonly logger = new Logger(UsersService.name, { timestamp: true });

    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | String> {
    return this.userRepository.findOneByOrFail({ id }).catch(
      () => {
        const message : String =  `couldn't find user with id ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }
  async findByName(name : String) : Promise<User | null>{
    return this.userRepository.findOneByOrFail({name}).catch(
      () =>
      {
        const message : String =  `couldn't find user with name :  ${name}`;
        this.logger.warn(message, this)
        return null;
      }
    )
  }


  async create( createUserDto: CreateUserDto) : Promise<User>{
    const newUser : User = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id : number, attrs: Partial<UpdateUserDto>) : Promise<User | String> {
    const user : User | String = await this.findOne(id);
    if (typeof user === "string"){
      return user
    }
    return "";
  } 
}
