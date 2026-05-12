
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Must be used with workout guard and a param with "id".
 * @see WorkoutRouteIdValidGuard
 */
export const WorkoutParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.workout;
  },
)