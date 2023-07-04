import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from './redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(RedisService)
  private redisService: RedisService;
  @Inject(Reflector)
  private reflector: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('permission guard', this.userService);
    const request: Request = context.switchToHttp().getRequest();

    // console.log('request: ', (request as any).user);
    const user = (request as any).user;
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    // 先从redis中找
    let permissions = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    );
    if (!permissions.length) {
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map((item) => item.name);

      this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get('permission', context.getHandler());

    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
