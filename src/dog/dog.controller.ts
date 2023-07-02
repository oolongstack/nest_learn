import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/interceptories/logging.interceptor';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { MyParam } from 'src/decorator/param.decorator';
import { MyQuery } from 'src/decorator/query.decorator';
import { DogDecorators } from 'src/decorator/dog.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/storage';
import { FileSizeValidationPipe } from 'src/pipes/fileSize.pipe';

// @Controller('dog')
// @UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor)
// @UsePipes(ValidationPipe)
// 自定义类装饰器
@DogDecorators('dog', AuthGuard, LoggingInterceptor, ValidationPipe)
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }

  @Get('list')
  @Roles('admin')
  list(@MyQuery('page') page: string) {
    console.log('page: ', page);
    return page;
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.dogService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.dogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogService.remove(+id);
  }

  @Post('upload')
  @Roles('admin')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles(FileSizeValidationPipe) files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('files: ', files);
  }
}
