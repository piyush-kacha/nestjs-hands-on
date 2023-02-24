import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.validateUserPassword(authCredentialsDto);
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneByUsername(username);
  }
}
