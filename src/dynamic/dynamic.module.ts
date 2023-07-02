import { DynamicModule, Module } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { DynamicController } from './dynamic.controller';

@Module({})
export class DynamiModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DynamiModule,
      controllers: [DynamicController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicService,
      ],
      exports: [],
    };
  }
}
