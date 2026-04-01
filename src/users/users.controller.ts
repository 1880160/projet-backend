import { Body, Controller, Get, Post, Param, Patch,Delete, UseInterceptors, ClassSerializerInterceptor, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user/user.entity';
import { CreateUserDto, PublicResponseUserDTO, SignInUserDTO, UpdateUserDto } from './user/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserParam } from './user/user.decorator';
import { AdminGuard } from './auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService : AuthService
  ) {}


  @Post("/sign-in")
  async signIn(@Body() signInInfos : SignInUserDTO ) : Promise<{ access_token: string }> {
    return await this.authService.signIn(signInInfos.username,signInInfos.password);
  }
  @UseGuards(AuthGuard)
  @Get("/refresh-login")
  async refreshLogin(@UserParam() user) : Promise<{ access_token: string }> {
    return await this.authService.refreshToken(user.sub);
  }

  @UseGuards(AuthGuard)
  @Get("/my-info")
  async getProfile(@UserParam() user ){
    return user;
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Get()
  async findAll() : Promise<User[]>{
    return await this.usersService.getAllUsers();
  }
  @Post("/sign-up")
  async create(@Body() CreateUserDto : CreateUserDto) : Promise<User>{
    return await this.authService.signUp(CreateUserDto);
  }
  
  @Serialize(PublicResponseUserDTO)
  @UseGuards(AuthGuard,AdminGuard)
  @Get("/:id")
  async findUser(@Param("id") userId : number, @Request() uwu) : Promise<User | String>{
    return this.usersService.findOne(userId);
  }

  @UseGuards(AuthGuard) /*missing admin guard for testing purposes */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto:  Partial<UpdateUserDto> ) {
    return await this.usersService.updateUser(+id, updateUserDto);
  }
  @UseGuards(AuthGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.deleteUser(+id);
  }



}
