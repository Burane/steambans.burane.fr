import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  CSP from './csp';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() : Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000, // 60 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: "*",
  });

  app.use(CSP)

  await app.listen(3008);
  console.log(await app.getUrl());
}
bootstrap();
 