import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AdminGuard } from 'src/users/auth/admin.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Exercises")
@UseGuards(AuthGuard,AdminGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}
  @ApiOperation({summary : "Creates an exercise in the public database"})
  @Post("/create-exercise")
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.exercisesService.createExercise(createExerciseDto).catch(() => {
      throw new BadRequestException('name is already taken')
  }
    );
  }
  @ApiOperation({summary : "Gets all exercises, filtering by name and muscles groups"})
  @Get()
  async findAll(@Query('name') name : string, @Query('muscle_group') muscleGroup : string, @Query('secondary_muscle_group') secondaryMuscleGroup : string) {
    return await this.exercisesService.findAll(name, muscleGroup, secondaryMuscleGroup);
  }
  @ApiOperation({summary : "Gets an exercise by id"})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exercisesService.findOne(+id);
  }
  @ApiOperation({summary : "Updates a exercise in the public database"})
  @ApiBody({ type: [UpdateExerciseDto] })
  @Patch('/update-exercise/:id')
  async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return await this.exercisesService.updateExercise(+id, updateExerciseDto);
  }
  @ApiOperation({summary : "Deletes a exercise in the public database"})
  @Delete('/delete-exercise/:id')
  async remove(@Param('id') id: string) {
    return await this.exercisesService.deleteExercise(+id);
  }

  

}
