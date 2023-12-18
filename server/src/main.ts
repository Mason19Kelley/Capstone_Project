import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('APIs')
    .setDescription('Lists all of our apis.');
    


  const controllers = app.getHttpServer().getModules().map((module) => module.controllers);
  const controllerNames = controllers.reduce((acc, curr) => acc.concat(curr.map((controller) => controller.name)), []);
  
  controllerNames.forEach((controllerName) => {
    config.addTag(controllerName);
  });


  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
