import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DogService } from 'src/dog/dog.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly dogService: DogService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('logger middleware...', this.dogService.findAll());
    next();
  }
}
