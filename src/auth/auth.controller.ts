import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async singIn(@Req() req: any): Promise<{ access_token: string }> {
    return await this.authService.singIn(req.user);
  }

  @Post('signup')
  async singUp(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.singUp(userDto);
  }
}
