import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';

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
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async findOneByUsername(username) {
    const options: FindOneOptions<User> = { where: { username } };
    return this.findOne(options);
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { password, username } = authCredentialsDto;

    const options: FindOneOptions<User> = { where: { username } };
    const user = await this.findOne(options);

    if (user && (await user.validatePassword(password))) {
      return username;
    } else {
      return null;
    }
  }
}
