import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AdminGuard } from 'src/users/auth/admin.guard';

@UseGuards(AuthGuard,AdminGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post("/create-exercise")
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.exercisesService.createExercise(createExerciseDto).catch(() => {
      throw new BadRequestException('name is already taken')
  }
    );
  }

  @Get()
  async findAll(@Query('name') name : string, @Query('muscle_group') muscleGroup : string, @Query('secondary_muscle_group') secondaryMuscleGroup : string) {
    return await this.exercisesService.findAll(name, muscleGroup, secondaryMuscleGroup);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exercisesService.findOne(+id);
  }

  @Patch('/update-exercise/:id')
  async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return await this.exercisesService.updateExercise(+id, updateExerciseDto);
  }

  @Delete('/delete-exercise/:id')
  async remove(@Param('id') id: string) {
    return await this.exercisesService.deleteExercise(+id);
  }

  

}
