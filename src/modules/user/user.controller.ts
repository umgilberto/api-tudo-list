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
import { CreateUserInput, UpdateUserInput, UserOutput } from './dtos';
import { UserService } from './user.service';
import { GetUserOutput } from './dtos/user-pagination';
import { SwaggerTagsEnum } from 'src/shareds/enums/swaggerTags.enum';
import { JwtAuthGuard } from 'src/guards';

@UseGuards(JwtAuthGuard)
@Controller(RouteEnum.User)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags(SwaggerTagsEnum.User)
  @ApiOperation({ summary: 'Create user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() data: CreateUserInput): Promise<UserOutput> {
    console.log(data);
    return this.userService.create(data);
  }

  @ApiTags(SwaggerTagsEnum.User)
  @ApiOperation({ summary: 'Create user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Req() req: Request, @Param('id') id: string): Promise<UserOutput> {
    return this.userService.update(id, <UpdateUserInput>req['user']);
  }

  @ApiTags(SwaggerTagsEnum.User)
  @ApiOperation({ summary: 'get user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): Promise<UserOutput> {
    return this.userService.getOne(id);
  }

  @ApiTags(SwaggerTagsEnum.User)
  @ApiOperation({ summary: 'list user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: GetUserOutput })
  @Get()
  @HttpCode(HttpStatus.OK)
  listAll(): Promise<GetUserOutput> {
    return this.userService.getAll();
  }

  @ApiTags(SwaggerTagsEnum.User)
  @ApiOperation({ summary: 'Delete user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
