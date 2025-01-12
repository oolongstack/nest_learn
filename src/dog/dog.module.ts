import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule {}
