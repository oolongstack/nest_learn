import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const MyParam = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return `my custom ${data}`;
  },
);
