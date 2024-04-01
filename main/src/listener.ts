import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://uilhynpj:Al_Pu2Xua9ijFGu4sTwist5FVCIVEnkj@albatross.rmq.cloudamqp.com/uilhynpj'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();
