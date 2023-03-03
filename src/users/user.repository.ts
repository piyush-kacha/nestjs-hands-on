import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';
import { InternalServerErrorException } from 'src/exceptions/internal-server-error.exception';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (err) {
      // 23505 is duplicate username
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw InternalServerErrorException.INTERNAL_SERVER_ERROR(err);
      }
    }
  }

  async findOne(options: FindOptionsWhere<User>) {
    return this.userRepository.findOneBy(options);
  }

  async findOneByUsername(username) {
    const options: FindOptionsWhere<User> = { username };
    return this.findOne(options);
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { password, username } = authCredentialsDto;

    const options: FindOptionsWhere<User> = { username };
    const user = await this.findOne(options);

    if (user && (await user.validatePassword(password))) {
      return username;
    } else {
      return null;
    }
  }
}
