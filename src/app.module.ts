import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { DynamiModule } from './dynamic/dynamic.module';
import { DogController } from './dog/dog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entities/permission.entity';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { RedisModule } from './redis/redis.module';
import { LPipeModule } from './l_pipe/l_pipe.module';

@Module({
  imports: [
    CatModule,
    DogModule,
    AaaModule,
    BbbModule,
    DynamiModule.register({ name: 'dynamic module' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '2000101abc',
      database: 'acl_test',
      synchronize: true,
      logging: true,
      entities: [User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'cjl',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    PermissionModule,
    RedisModule,
    LPipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationShutdown, NestModule {
  onApplicationShutdown(signal?: string) {
    console.log('signal: ', signal);
    // 数据库连接关闭
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(DogController);
  }
}
