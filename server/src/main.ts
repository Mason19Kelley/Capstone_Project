import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  //Swagger setup, see swagger docs for config meanings
  const config = new DocumentBuilder()
    .setTitle('APIs')
    .setDescription('Lists all of our apis.')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
        explorer: true, // Enable Swagger UI Explorer
    },
    customSiteTitle: 'Swagger Login Example', // Set a custom title for Swagger UI
});

  await app.listen(3000);
}
bootstrap();
