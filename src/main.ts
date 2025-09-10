import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import basicAuth from "express-basic-auth";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerUser = configService.get("swagger.user.username");
  const swaggerPassword = configService.get("swagger.user.password");
  const serverPort = configService.get("server.port");

  app.use(
    "/docs",
    basicAuth({
      challenge: true,
      users: {
        [swaggerUser]: swaggerPassword || "",
      },
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("CS3_TECNICAL_TEST API")
    .setDescription("Documentación de la API de CS3_TECNICAL_TEST")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(serverPort ?? 3000);
}
bootstrap();
