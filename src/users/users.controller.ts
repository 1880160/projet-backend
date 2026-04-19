import { Body, Controller, Get, Post, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user/user.entity';
import { CreateUserDto, PublicResponseUserDTO, SignInUserDTO, UpdateUserDto } from './user/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserParam } from './user/user.decorator';
import { AdminGuard } from './auth/admin.guard';
import type { UserTokenLogin } from './auth/auth.userlogin';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService : AuthService
  ) {}

  @ApiOperation({summary : "Sign into a route"})
  @Post("/sign-in")
  async signIn(@Body() signInInfos : SignInUserDTO ) : Promise<{ access_token: string }> {
    return await this.authService.signIn(signInInfos.username,signInInfos.password);
  }
  @ApiOperation({summary : "Sign up / creates an account"})
  @UseGuards(AuthGuard)
  @Get("/refresh-login")
  async refreshLogin(@UserParam() user : UserTokenLogin) : Promise<{ access_token: string }> {
    return await this.authService.refreshToken(user.sub);
  }
  @ApiOperation({summary : "Gets the current logged in user"})
  @Serialize(PublicResponseUserDTO)
  @UseGuards(AuthGuard)
  @Get("/my-info")
  async getProfile(@UserParam() user : UserTokenLogin ){
    return await this.usersService.findOne(user.sub);
  }

  @ApiOperation({ summary: "Gets all the users"})
  @UseGuards(AuthGuard,AdminGuard)
  @Get()
  async findAll() : Promise<User[]>{
    return await this.usersService.getAllUsers();
  }
  @ApiOperation({summary : "Sign-up / creates an account"})
  @Post("/sign-up")
  async create(@Body() CreateUserDto : CreateUserDto) : Promise<User>{
    return await this.authService.signUp(CreateUserDto);
  }
  
  @ApiOperation({summary : "Gets the user with the specified id"})
  @Serialize(PublicResponseUserDTO)
  @UseGuards(AuthGuard,AdminGuard)
  @Get("/:id")
  async findUser(@Param("id") userId : number) : Promise<User | String>{
    return this.usersService.findOne(userId);
  }
  @ApiOperation({summary : "Updates the user"})
  @ApiBody({type : [UpdateUserDto]})
  @UseGuards(AuthGuard) /*missing admin guard for testing purposes */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto:  Partial<UpdateUserDto> ) {
    return await this.usersService.updateUser(+id, updateUserDto);
  }
  @ApiOperation({summary : "Removes an user"})
  @UseGuards(AuthGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.deleteUser(+id);
  }



}
