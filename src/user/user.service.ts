import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  async create(createUserDto: CreateUserDto) {
    // const result = await this.manager.save(User, createUserDto);
    const result = await this.userRepository.save(createUserDto);
    console.log('result: ', result);
    return 'This action adds a new user';
  }

  findAll() {
    return this.manager.find(User);
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.manager.save(User, {
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.manager.delete(User, id);
  }

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }
}
