import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import setupDoc from './docs.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  /** 文档 */
  setupDoc(app);

  const port = process.env.NODE_ENV || 3004;
  await app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
}

bootstrap();
