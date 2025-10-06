import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>("PORT");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    })
  );

  const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  };

  app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("NestJS API")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(port || 1000);
}
bootstrap();
