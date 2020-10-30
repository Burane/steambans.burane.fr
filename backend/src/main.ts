import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  app.enableCors({
    origin: "*",
  });

  await app.listen(3008);
}
bootstrap();
 