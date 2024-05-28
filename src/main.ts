import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllResponse } from './middlewares/all-response.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','debug','verbose','fatal'],
  });
  app.use(AllResponse);
  await app.listen(3000);
}
bootstrap();


//https://www.youtube.com/watch?v=8_X0nSrzrCw