import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllResponse } from './middlewares/all-response.middleware';
import { AllExceptionsFilter } from './all_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','debug','verbose','fatal'],
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter({httpAdapter}));
  
  app.use(AllResponse);
  await app.listen(3000);
}
bootstrap();


//https://www.youtube.com/watch?v=8_X0nSrzrCw
//https://www.youtube.com/watch?v=9MGKKJTwicM