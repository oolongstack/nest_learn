import { PartialType } from '@nestjs/mapped-types';
import { CreateLPipeDto } from './create-l_pipe.dto';

export class UpdateLPipeDto extends PartialType(CreateLPipeDto) {}
