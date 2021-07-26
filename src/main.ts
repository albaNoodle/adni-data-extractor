import { NestFactory } from '@nestjs/core';
import { SwaggerConfig } from 'config/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.setup(app);
  await app.listen(3000);
}
bootstrap();
