import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../project.repository";

@Injectable()
export class FindOneProjectUseCase {

  constructor( 
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository
  ) {}

  execute(id: string) {
    return this.projectRepo.findById(id);
  }
}