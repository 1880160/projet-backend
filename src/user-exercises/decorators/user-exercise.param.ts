
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Must be used with UserExerciseGuard guard and a param with "id".
 * @see UserExerciseGuard
 */
export const UserExerciseParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userExercise;
  },
)