import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'SignUp successfully',
  })
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiResponse({
    status: 200,
    description: 'SignIn successfully',
  })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
