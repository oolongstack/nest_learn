import {
  Controller,
  UseGuards,
  UseInterceptors,
  UsePipes,
  applyDecorators,
} from '@nestjs/common';

export const DogDecorators = (path, guard, interceptor, pipe) => {
  return applyDecorators(
    Controller(path),
    UseGuards(guard),
    UseInterceptors(interceptor),
    UsePipes(pipe),
  );
};
