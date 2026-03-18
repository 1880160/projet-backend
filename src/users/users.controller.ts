import { Body, Controller, Get, Post, Param, UseInterceptors, ClassSerializerInterceptor, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, PublicResponseUserDTO, SignInUserDTO } from './user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserParam } from './user.decorator';
import { AdminGuard } from './auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService : AuthService
  ) {}


  @Post("/sign-in")
  async signIn(@Body() signInInfos : SignInUserDTO ) : Promise<{ access_token: string }> {
    return await this.authService.signIn(signInInfos.name,signInInfos.password);
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Get("/my-info")
  async getProfile(@UserParam() wuwu ){
    return wuwu;
  }


  @Get()
  async findAll() : Promise<User[]>{
    return await this.usersService.findAll();
  }
  @Post("/sign-up")
  async create(@Body() CreateUserDto : CreateUserDto) : Promise<User>{
    return await this.usersService.create(CreateUserDto)
  }
  
  @Serialize(PublicResponseUserDTO) // custom decorator
  @Get("/:id")
  async findUser(@Param("id") userId : number, @Request() uwu) : Promise<User | String>{
    return this.usersService.findOne(userId);
  }


}
