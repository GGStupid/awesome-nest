import { UploadService } from './upload.service';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('文件上传模块')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', {
    dest: './OSS/small',
  }))
  async uploadSmall(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadSmall(file);
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
