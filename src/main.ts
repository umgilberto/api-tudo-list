import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tudo-list api')
    .setDescription(
      'This project aims to develop an API for a project to manage its tasks',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(environment.api.port);
}
bootstrap();
