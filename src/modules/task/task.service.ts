import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTaskInput,
  UpdateTaskInput,
  TaskOutput,
  TaskPaginationOutput,
} from './dtos';
import { TaskRepository } from './repositories';
import * as utils from '../../shareds/utils';
import { GetTaskOutput } from './dtos/task-pagination';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(data: CreateTaskInput): Promise<TaskOutput> {
    const isSlugUsed = await this.taskRepository.exist({
      where: { slug: data.slug },
    });

    if (isSlugUsed) throw new ConflictException({ key: 'slug_already_exists' });

    const taskCreated = await this.taskRepository.save(data);

    return utils.autoMapper(
      TaskOutput,
      await this.taskRepository.findOne({ where: { id: taskCreated.id } }),
    );
  }

  async getAll(): Promise<TaskPaginationOutput> {
    const [_tasks, _total] = await this.taskRepository.findAndCount();

    return new GetTaskOutput(_tasks, _total);
  }

  async getOne(id: string): Promise<TaskOutput> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException({ key: 'not_fround_task' });

    return utils.autoMapper(TaskOutput, task);
  }

  async update(id: string, data: UpdateTaskInput): Promise<TaskOutput> {
    const task = this.taskRepository.findOne({
      where: { id },
    });

    if (!task) throw new ConflictException({ key: 'not_fround_task' });

    await this.taskRepository.update(
      { id },
      {
        ...data,
      },
    );

    return utils.autoMapper(
      TaskOutput,
      await this.taskRepository.findOne({ where: { id } }),
    );
  }

  async delete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) throw new ConflictException({ key: 'not_found_task' });

    await this.taskRepository.delete(task.id);
  }
}
