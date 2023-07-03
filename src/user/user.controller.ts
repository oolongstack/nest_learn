import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('user: ', user);
    const foundUser = await this.userService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('authorization', 'bearer ' + token);
      return { message: 'login success', token };
    } else {
      return 'login fail';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    console.log('user: ', user);
    return await this.userService.register(user);
  }

  @Get('auth')
  @UseGuards(LoginGuard)
  auth() {
    return 'auth success';
  }
}
