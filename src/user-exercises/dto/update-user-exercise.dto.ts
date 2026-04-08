import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExerciseDto } from './create-user-exercise.dto';
export class UpdateUserExerciseDto extends PartialType(CreateUserExerciseDto) {

}
