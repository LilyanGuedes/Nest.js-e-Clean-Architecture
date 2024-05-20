import { UpdateProjectDto } from "../dto/update-project.dto";
import { Inject } from "@nestjs/common";
import { IProjectRepository } from "../project.repository";

export class UpdateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository
  ) {}

  async execute(id: string, input: UpdateProjectDto) {
    const project = await this.projectRepo.findById(id);
    project.name = input.name;
    project.description = input.description;
    await this.projectRepo.update(project);
    return project;
  }
}