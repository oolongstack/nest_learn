import { Injectable } from '@nestjs/common';
import { CreateLPipeDto } from './dto/create-l_pipe.dto';
import { UpdateLPipeDto } from './dto/update-l_pipe.dto';

@Injectable()
export class LPipeService {
  create(createLPipeDto: CreateLPipeDto) {
    return 'This action adds a new lPipe';
  }

  findAll() {
    return `This action returns all lPipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lPipe`;
  }

  update(id: number, updateLPipeDto: UpdateLPipeDto) {
    return `This action updates a #${id} lPipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} lPipe`;
  }
}
