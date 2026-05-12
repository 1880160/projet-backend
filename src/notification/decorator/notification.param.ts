
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Must be used with notification guard and a param with "id".
 * @see NotificationRouteIdValidGuard
 */
export const NotificationParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.notification;
  },
)