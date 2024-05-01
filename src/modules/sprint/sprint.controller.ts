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
import { CreateSprintInput, UpdateSprintInput, SprintOutput } from './dtos';
import { SprintService } from './sprint.service';
import { GetSprintOutput } from './dtos/sprint-pagination';
import { SwaggerTagsEnum } from 'src/shareds/enums/swaggerTags.enum';
import { JwtAuthGuard } from 'src/guards';

@UseGuards(JwtAuthGuard)
@Controller(RouteEnum.Sprint)
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @ApiTags(SwaggerTagsEnum.Sprint)
  @ApiOperation({ summary: 'Create sprint endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: SprintOutput })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() data: CreateSprintInput): Promise<SprintOutput> {
    console.log(data);
    return this.sprintService.create(data);
  }

  @ApiTags(SwaggerTagsEnum.Sprint)
  @ApiOperation({ summary: 'Create sprint endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: SprintOutput })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Req() req: Request, @Param('id') id: string): Promise<SprintOutput> {
    return this.sprintService.update(id, <UpdateSprintInput>req['sprint']);
  }

  @ApiTags(SwaggerTagsEnum.Sprint)
  @ApiOperation({ summary: 'get sprint endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: SprintOutput })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getSprint(@Param('id') id: string): Promise<SprintOutput> {
    return this.sprintService.getOne(id);
  }

  @ApiTags(SwaggerTagsEnum.Sprint)
  @ApiOperation({ summary: 'list sprint endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: GetSprintOutput })
  @Get()
  @HttpCode(HttpStatus.OK)
  listAll(): Promise<GetSprintOutput> {
    return this.sprintService.getAll();
  }

  @ApiTags(SwaggerTagsEnum.Sprint)
  @ApiOperation({ summary: 'Delete sprint endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: SprintOutput })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteSprint(@Param('id') id: string): Promise<void> {
    return this.sprintService.delete(id);
  }
}
