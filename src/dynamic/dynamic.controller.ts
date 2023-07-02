import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { CreateDynamicDto } from './dto/create-dynamic.dto';
import { UpdateDynamicDto } from './dto/update-dynamic.dto';

@Controller('dynamic')
export class DynamicController {
  constructor(
    private readonly dynamicService: DynamicService,
    @Inject('CONFIG_OPTIONS') private opts: Record<string, any>,
  ) {}

  @Post()
  create(@Body() createDynamicDto: CreateDynamicDto) {
    return this.dynamicService.create(createDynamicDto);
  }

  @Get()
  findAll() {
    console.log(this.opts.name);

    return this.dynamicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDynamicDto: UpdateDynamicDto) {
    return this.dynamicService.update(+id, updateDynamicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicService.remove(+id);
  }
}
