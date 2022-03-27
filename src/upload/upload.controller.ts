import { UploadService } from './upload.service';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';


@ApiTags('文件上传模块')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSmall(@UploadedFile() file: Express.Multer.File) {
    console.log(file, join(__dirname, '..', '../public/upload', `${file.originalname}`));
    const writeImage = createWriteStream(join(__dirname, '..', '../public/upload', `${file.originalname}`))
    writeImage.write(file.buffer)
    return '上传成功';
    // return this.uploadService.uploadSmall(file);
  }

  @Post('/chunk')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBig(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadBig(file);
  }

  @Post('/merge')
  async uploadMerge(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.mergeBigFile(file);
  }
}
