import { PartialType } from '@nestjs/swagger';
import { CreateUserExerciseDto } from './create-user-exercise.dto';
export class UpdateUserExerciseDto extends PartialType(CreateUserExerciseDto) {

}
