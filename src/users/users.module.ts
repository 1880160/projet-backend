import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/auth.constant';
@Module({
  exports : [UsersService],
  imports : [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,  ///We're registering the JwtModule as global to make things easier for us. This means that we don't need to import the JwtModule anywhere else in our application
      signOptions: { expiresIn: '60s' },
    })],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
