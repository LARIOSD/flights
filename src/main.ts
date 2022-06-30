import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutIntepcertor } from './common/intenceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutIntepcertor());
  await app.listen(parseInt(process.env.SERVER_PORT, 10) || 4002);
  const logger = new Logger();
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
