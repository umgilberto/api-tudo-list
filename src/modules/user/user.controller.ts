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
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RouteEnum } from 'src/shareds/enums/routes.enum';
import { CreateUserInput, UpdateUserInput, UserOutput } from './dtos';
import { UserService } from './user.service';

@Controller(RouteEnum.User)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Req() req: Request): Promise<UserOutput> {
    return this.userService.create(<CreateUserInput>req['user']);
  }

  @ApiOperation({ summary: 'Create user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Req() req: Request, @Param('id') id: string): Promise<UserOutput> {
    return this.userService.update(id, <UpdateUserInput>req['user']);
  }

  @ApiOperation({ summary: 'list user endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: UserOutput })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): Promise<UserOutput> {
    return this.userService.getOne(id);
  }
}
