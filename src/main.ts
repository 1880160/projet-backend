import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { json } from 'stream/consumers';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    whitelist : true,
    forbidNonWhitelisted : true
  }))
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector))
  // )

  app.enableCors(
    {
    allowedHeaders: ['content-type', 'Authorization'],
    credentials: true,
    }
  );


  const config = new DocumentBuilder()
    .setTitle('Project_Workout example')
    .setDescription('The Project_Workout API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const outputPath = join(process.cwd(),'open-api-docs/open-api.json')
  try{
    writeFileSync(outputPath,JSON.stringify(documentFactory(),null,2),{encoding : 'utf8'});
  }
  catch(error){
    console.error('Failed to write OpenApi file', error);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
