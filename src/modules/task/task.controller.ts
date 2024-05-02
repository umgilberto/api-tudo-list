import {
  Controller,
  Post,
  HttpCode,
  Req,
  Get,
  HttpStatus,
  Param,
  Request,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouteEnum } from 'src/shareds/enums/routes.enum';
import { CreateTaskInput, UpdateTaskInput, TaskOutput } from './dtos';
import { TaskService } from './task.service';
import { GetTaskOutput } from './dtos/task-pagination';
import { SwaggerTagsEnum } from 'src/shareds/enums/swaggerTags.enum';
import { JwtAuthGuard } from 'src/guards';

@UseGuards(JwtAuthGuard)
@Controller(RouteEnum.Task)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiTags(SwaggerTagsEnum.Task)
  @ApiOperation({ summary: 'Create task endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: TaskOutput })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() data: CreateTaskInput): Promise<TaskOutput> {
    console.log(data);
    return this.taskService.create(data);
  }

  @ApiTags(SwaggerTagsEnum.Task)
  @ApiOperation({ summary: 'Create task endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: TaskOutput })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Req() req: Request, @Param('id') id: string): Promise<TaskOutput> {
    return this.taskService.update(id, <UpdateTaskInput>req['task']);
  }

  @ApiTags(SwaggerTagsEnum.Task)
  @ApiOperation({ summary: 'get task endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: TaskOutput })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTask(@Param('id') id: string): Promise<TaskOutput> {
    return this.taskService.getOne(id);
  }

  @ApiTags(SwaggerTagsEnum.Task)
  @ApiOperation({ summary: 'list task endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: GetTaskOutput })
  @Get()
  @HttpCode(HttpStatus.OK)
  listAll(): Promise<GetTaskOutput> {
    return this.taskService.getAll();
  }

  @ApiTags(SwaggerTagsEnum.Task)
  @ApiOperation({ summary: 'Delete task endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: TaskOutput })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
