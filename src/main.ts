import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  //set global route prefix
  app.setGlobalPrefix('/api/v1');

  //setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The Blog API documentation')
    .setVersion('1.0')
    .addTag('blog')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
