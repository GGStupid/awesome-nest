import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const port = process.env.NODE_ENV || 3004;
  await app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
}

bootstrap();
