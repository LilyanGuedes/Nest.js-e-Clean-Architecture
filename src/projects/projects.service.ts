import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { PorjectStatus, Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class ProjectsService {

  constructor (
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto)
    
    if(project.started_at) {
      project.status = PorjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find()
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: {id}});
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({where: {id}})

    if(updateProjectDto.started_at) {
      if(project.status === PorjectStatus.Active) {
        throw new Error('Cannot start activated project')
      }

      if(project.status === PorjectStatus.Completed) {
        throw new Error('Cannot start completed project')
      }

      if(project.status === PorjectStatus.Cancelled) {
        throw new Error('Cannot start cancelled project')
      }
      project.started_at = updateProjectDto.started_at;
      project.status = PorjectStatus.Active;
    }

    if(updateProjectDto.cancelled_at) {
      if(project.status === PorjectStatus.Completed) {
        throw new Error('Cannot cancel completed project')
      }

      if(project.status === PorjectStatus.Cancelled) {
        throw new Error('Cannot cancel cancelled project')
      }

      if(updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cannot cancel project before it started')
      }  

      project.cancelled_at = updateProjectDto.cancelled_at;
      project.status = PorjectStatus.Cancelled;
    }


    if(updateProjectDto.finished_at) {
      if(project.status === PorjectStatus.Completed) {
        throw new Error('Cannot finish completed project')
      }

      if(project.status === PorjectStatus.Cancelled) {
        throw new Error('Cannot finish cancelled project')
      } 
      
      if(updateProjectDto.finished_at < project.started_at) {
        throw new Error('Cannot finish project before it started')
      }
      
      project.finished_at = updateProjectDto.finished_at;
      project.status = PorjectStatus.Completed;
    }

   

    this.projectRepo.merge(project, updateProjectDto)

    return await this.projectRepo.save(project)
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
