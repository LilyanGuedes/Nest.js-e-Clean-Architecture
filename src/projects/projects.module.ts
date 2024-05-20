import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsWithUseCaseController } from './projects-with-use-case.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { ProjectTypeOrmRepository } from './project.repository';
import { DeleteProjectUseCase } from './use-cases/delete-project.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { FinishProjectUseCase } from './use-cases/finish-project.use-case';
import { UpdateProjectUseCase } from './use-cases/update-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [
    // ProjectsController, 
    ProjectsWithUseCaseController
  ],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectUseCase,
    FindOneProjectUseCase,
    StartProjectUseCase,
    DeleteProjectUseCase,
    ProjectTypeOrmRepository,
    CancelProjectUseCase,
    FinishProjectUseCase,
    UpdateProjectUseCase,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository
    }
  ],
})
export class ProjectsModule {}
