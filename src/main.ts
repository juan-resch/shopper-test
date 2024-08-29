import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'

import { AppModule } from './app.module'
import { HttpException } from './shared/web/filters/http-exception.filter'
import { SentryFilter } from './shared/web/filters/sentry-exception-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('APINAME - VERSION')
    .setDescription('Sample description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  const { httpAdapter } = app.get(HttpAdapterHost)

  SwaggerModule.setup('docs', app, document)

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  })

  app.setGlobalPrefix('api/v1')
  app.useGlobalFilters(new HttpException())
  app.useGlobalFilters(new SentryFilter(httpAdapter))
  app.enableCors()

  await app.listen(8000)
}

bootstrap()
