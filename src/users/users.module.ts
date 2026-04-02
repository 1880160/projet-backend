import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtToken } from './auth/auth.constant';
import { AuthModule } from 'src/users/auth/auth.module';
@Global()
@Module({
  exports : [UsersService],
  imports : [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtToken, 
      signOptions: { expiresIn: '60s' },
    }),
  AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
