
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTokenLogin } from '../auth/auth.userlogin';

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userLogin : UserTokenLogin = request.user
    return userLogin;
  },
)