import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [],
    /**
     * credentials: true로 설정하면 서버에서 클라이언트로 쿠키를 전송할 수 있습니다.
     */
    credentials: false,
  });

  const config = new DocumentBuilder()
    .setTitle('Elicelab_OpenAPI')
    .setDescription('Elicelab_OpenAPI description')
    .setVersion('1.0')
    .addTag('elicelab_')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3020);
}
bootstrap();
