import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

const { port } = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidateInputPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(errors),
    }),
  );

  const PORT = port || 3000;

  await app.listen(PORT);
}
bootstrap();
