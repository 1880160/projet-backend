import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';
@Module({
    providers : [AuthService],
    exports : [AuthService]
})
export class AuthModule {}
