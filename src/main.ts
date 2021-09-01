import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { Rol } from './infrastructure/database/auth/rol';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await getRepository(Rol).save([{nameRol:'ADMIN', _id:'1'},{nameRol:'DOCTOR',_id:'2'},{nameRol:'PACIENTE',_id:'3'}]);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
