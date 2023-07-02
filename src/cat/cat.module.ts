import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { DogModule } from 'src/dog/dog.module';

@Module({
  imports: [DogModule],
  controllers: [CatController],
  providers: [
    CatService,
    {
      provide: 'msg',
      useValue: {
        name: 'tom',
      },
    },
    {
      provide: 'factory',
      useFactory(msg: { name: string }, catService: CatService) {
        return {
          name: msg.name,
          value: catService.findAll(),
        };
      },
      inject: ['msg', CatService],
    },
  ],
})
export class CatModule {}
