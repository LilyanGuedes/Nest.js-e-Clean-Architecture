import { Controller, Get, Post, Body, Param, Inject, Delete, Patch } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { DeleteProjectUseCase } from './use-cases/delete-project.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { CancelProjectDto } from './dto/cancel-project.dto';

@Controller('projects')
export class ProjectsWithUseCaseController {

  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;
  @Inject(FindAllProjectUseCase)
  private readonly findAllProjectUseCase: FindAllProjectUseCase;
  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;
  @Inject(DeleteProjectUseCase)
  private readonly deleteProjectUseCase: DeleteProjectUseCase;
  @Inject(FindOneProjectUseCase)
  private readonly findOneProjectUseCase: FindOneProjectUseCase
  @Inject(CancelProjectUseCase)
  private readonly cancelProjectUseCase: CancelProjectUseCase


  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProjectUseCase.execute(id)
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProjectUseCase.execute(id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Body() cancelProjectDto: CancelProjectDto) {
    return this.cancelProjectUseCase.execute(id, cancelProjectDto)
  }
}
