import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('BizzFlow API')
    .setDescription('API documentation for BizzFlow system')
    .setVersion('1.0')
    .addBearerAuth() // optional: if using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // strips properties that do not have any decorators
    forbidNonWhitelisted: true, // throws an error if non-whitelisted fields are sent
    transform: true, // auto-transform payloads to DTO instances
  }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 BizzFlow is running on: http://localhost:${port}`);
  console.log(`✅ Swagger running at http://localhost:${port}/docs`);

}
bootstrap();
