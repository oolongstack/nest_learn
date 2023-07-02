import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { DogService } from 'src/dog/dog.service';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly dogService: DogService,
    @Inject('msg') private readonly msg: { name: string },
    @Inject('factory') private readonly factory: { name: string; value: any },
  ) {}
  // @Inject(CatService)
  // private readonly catService: CatService;

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    console.log(this.msg);
    console.log(this.factory);
    console.log(this.dogService.findAll());

    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createCatDto: CreateCatDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(createCatDto);

    console.log(files);
    return `received: ${JSON.stringify(createCatDto)}`;
  }
}
