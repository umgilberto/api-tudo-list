import { RouteEnum } from 'src/shareds/enums/routes.enum';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthOutPut, LoginDTO } from './dtos';
import { SwaggerTagsEnum } from 'src/shareds/enums/swaggerTags.enum';

@Controller(RouteEnum.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags(SwaggerTagsEnum.Auth)
  @ApiOperation({ summary: 'User login endpoint' })
  @ApiOkResponse({ description: 'Successfully', type: AuthOutPut })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() data: LoginDTO): Promise<AuthOutPut> {
    return this.authService.login(data);
  }
}
