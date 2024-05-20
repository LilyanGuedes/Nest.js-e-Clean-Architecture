import { Test, TestingModule } from "@nestjs/testing";
import { IProjectRepository } from "../project.repository";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../entities/project.entity";
import { CreateProjectUseCase } from "../use-cases/create-project.use-case";

describe('CreateProjectUseCase', () => {
  let createProjectUseCase: CreateProjectUseCase;
  let projectRepo: IProjectRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectUseCase,
        {
          provide: 'IProjectRepository',
          useValue: {
            create: jest.fn(), // Mock the create method
          },
        },
      ],
    }).compile();

    createProjectUseCase = module.get<CreateProjectUseCase>(CreateProjectUseCase);
    projectRepo = module.get<IProjectRepository>('IProjectRepository');
  });

  it('should create a project successfully', async () => {
    // Arrange
    const input: CreateProjectDto = {
      name: 'New Project',
      description: 'A new project description',
      started_at: new Date(),
      forecasted_at: new Date()
    };
    const expectedProject = new Project(input);

    // Mock the create method to return the expected project
    (projectRepo.create as jest.Mock).mockResolvedValue(expectedProject);

    // Act
    const result = await createProjectUseCase.execute(input);

    // Assert
    expect(projectRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New Project',
      description: 'A new project description',
      started_at: expect.any(Date),
      forecasted_at: expect.any(Date),
      status: 'active'
    }));
    expect(result).toEqual(expect.objectContaining({
      name: 'New Project',
      description: 'A new project description',
      started_at: expect.any(Date),
      forecasted_at: expect.any(Date),
      status: 'active'
    }));
  });

  it('should throw an error if project creation fails', async () => {
    // Arrange
    const input: CreateProjectDto = {
      name: 'New Project',
      description: 'A new project description',
      started_at: new Date(),
      forecasted_at: new Date()
    };
    const error = new Error('Project creation failed');

    // Mock the create method to throw an error
    (projectRepo.create as jest.Mock).mockRejectedValue(error);

    // Act & Assert
    await expect(createProjectUseCase.execute(input)).rejects.toThrow(error);
  });
});
