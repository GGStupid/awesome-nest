import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(@InjectRepository(Upload) private readonly repo: Repository<Upload>) { }

  async uploadSmall(file: Express.Multer.File) {
    let column = {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }
    console.log(file);

    const data = await this.repo.create(column)
    console.log(data);
    await this.repo.save(data)
    console.log(data);

    return data
  }

  async uploadBig(file: Express.Multer.File) {
    const data = await this.repo.create(file)
    return 'bing'
  }

  async mergeBigFile(file: Express.Multer.File) {
    return 'merge'
  }
}
