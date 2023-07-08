import { Module } from '@nestjs/common';
import { LPipeService } from './l_pipe.service';
import { LPipeController } from './l_pipe.controller';

// 用于学习pipe的module
@Module({
  controllers: [LPipeController],
  providers: [LPipeService],
})
export class LPipeModule {}
