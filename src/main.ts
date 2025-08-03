import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
];

app.enableCors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS error: Origin ${origin} not allowed by CORS`), false);
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('BizzFlow API')
    .setDescription('API documentation for BizzFlow system')
    .setVersion('1.0')
    .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'access-token', 
  ) 
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
