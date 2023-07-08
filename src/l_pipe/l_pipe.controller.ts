import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  UsePipes,
} from '@nestjs/common';
import { LPipeService } from './l_pipe.service';
import { createLPipeSchema, CreateLPipeDto } from './dto/create-l_pipe.dto';
import { UpdateLPipeDto } from './dto/update-l_pipe.dto';
import { MyPipe } from './my.pipe';
import { JoiValidationPipe } from './joi.pipe';
enum Ggg {
  AAA = 'aaa',
  BBB = 'bbb',
  CCC = 'ccc',
}

@Controller('l-pipe')
export class LPipeController {
  constructor(private readonly lPipeService: LPipeService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createLPipeSchema))
  create(@Body() createLPipeDto: CreateLPipeDto) {
    return this.lPipeService.create(createLPipeDto);
  }

  @Get()
  findAll(@Query('aa', ParseIntPipe) aa: string): string {
    // return this.lPipeService.findAll();
    return aa + 1;
  }

  @Get('ee')
  dinsEE(
    @Query(
      'ee',
      new ParseArrayPipe({
        items: Number,
        optional: true,
      }),
    )
    ee: number[],
  ) {
    // return this.lPipeService.findAll();
    return ee.reduce((pre, next) => pre + next, 0);
  }

  @Get('gg/:enum')
  testGG(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }

  @Get('my')
  testMy(@Query('my', MyPipe) my: string) {
    console.log('my: ', my);
    return my;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lPipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLPipeDto: UpdateLPipeDto) {
    return this.lPipeService.update(+id, updateLPipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lPipeService.remove(+id);
  }
}
