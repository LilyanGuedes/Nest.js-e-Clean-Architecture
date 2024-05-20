import { PartialType } from '@nestjs/mapped-types';

class _UpdateProjectDto {

  name: string;

  description: string;

}

export class UpdateProjectDto extends PartialType(_UpdateProjectDto) {}
