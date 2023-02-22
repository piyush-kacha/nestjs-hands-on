import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userService.signUp(authCredentialsDto);
  }
}
