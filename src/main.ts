import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { logger } from './middlewares/func.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.setGlobalPrefix('/api');
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
