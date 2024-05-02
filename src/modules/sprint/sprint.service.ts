import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateSprintInput,
  UpdateSprintInput,
  SprintOutput,
  SprintPaginationOutput,
} from './dtos';
import { SprintRepository } from './repositories';
import * as utils from '../../shareds/utils';
import { GetSprintOutput } from './dtos/sprint-pagination';

@Injectable()
export class SprintService {
  constructor(private readonly sprintRepository: SprintRepository) {}

  async create(data: CreateSprintInput): Promise<SprintOutput> {
    const isSlugUsed = await this.sprintRepository.exist({
      where: { slug: data.slug },
    });

    if (isSlugUsed) throw new ConflictException({ key: 'slug_already_exists' });

    const sprintCreated = await this.sprintRepository.save(data);

    return utils.autoMapper(
      SprintOutput,
      await this.sprintRepository.findOne({ where: { id: sprintCreated.id } }),
    );
  }

  async getAll(): Promise<SprintPaginationOutput> {
    const [_sprints, _total] = await this.sprintRepository.findAndCount();

    return new GetSprintOutput(_sprints, _total);
  }

  async getOne(id: string): Promise<SprintOutput> {
    const sprint = await this.sprintRepository.findOne({
      where: { id },
    });

    if (!sprint) throw new ConflictException({ key: 'not_fround_sprint' });

    return utils.autoMapper(SprintOutput, sprint);
  }

  async update(id: string, data: UpdateSprintInput): Promise<SprintOutput> {
    const sprint = await this.sprintRepository.findOne({
      where: { id },
    });

    if (!sprint) throw new ConflictException({ key: 'not_fround_sprint' });

    await this.sprintRepository.update(
      { id },
      {
        ...data,
      },
    );

    return utils.autoMapper(
      SprintOutput,
      await this.sprintRepository.findOne({ where: { id } }),
    );
  }

  async delete(id: string): Promise<void> {
    const sprint = await this.sprintRepository.findOne({
      where: { id },
    });

    if (!sprint) throw new ConflictException({ key: 'not_found_sprint' });

    await this.sprintRepository.delete(sprint.id);
  }
}
