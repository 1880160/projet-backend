import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtToken } from './auth/auth.constant';
@Module({
  exports : [UsersService],
  imports : [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtToken, 
      signOptions: { expiresIn: '60s' },
    })],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
