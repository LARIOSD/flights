import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { INewUser, IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<CreateUserDto> {
    const user: IUser = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );
    if (isValidPassword) {
      return user;
    }
    throw new UnauthorizedException('Incorrect username or password');
  }

  async singIn(user: INewUser) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async singUp(userDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.create(userDto);
  }
}
