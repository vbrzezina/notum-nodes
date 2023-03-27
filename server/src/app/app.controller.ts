import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dtos/LoginDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NodesDto } from './dtos/NodesDto';
import { AccessDto } from 'src/auth/dtos/AccessDto';
import { UserDto } from 'src/auth/dtos/UserDto';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'User logged.', type: AccessDto })
  @ApiResponse({ status: 401, description: 'Wrong credentials.' })
  @ApiOperation({ summary: 'Login.' })
  async login(@Request() req): Promise<AccessDto> {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User info.', type: UserDto })
  @ApiResponse({ status: 401, description: 'Invalid token.' })
  @ApiOperation({ summary: 'Fetch information about token.' })
  getMe(@Request() req): Promise<UserDto> {
    return this.authService.me(req.headers.authorization);
  }

  @Get('nodes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get nodes.', type: NodesDto })
  @ApiResponse({ status: 401, description: 'Invalid token.' })
  @ApiOperation({ summary: 'Fetch saved nodes.' })
  getNodes(@Request() req): NodesDto {
    return this.appService.getNodes();
  }

  @Post('nodes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: NodesDto })
  @ApiResponse({
    status: 200,
    description: 'Nodes were saved.',
    type: NodesDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid token.' })
  @ApiOperation({ summary: 'Save all nodes.' })
  saveNodes(@Request() req): NodesDto {
    return this.appService.saveNodes(req.body.nodes);
  }
}
