import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function setupDoc(app) {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('api 接口文档')
    .setDescription('nest 接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
