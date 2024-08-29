import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { CryptographyModule } from './@core/cryptography/modules/cryptography.module'
import { GeminiModule } from './modules/gemini/infra/modules/gemini.module'
import { ImagesModule } from './modules/images/infra/modules/images.module'
import { MeasurementModule } from './modules/measurement/infra/modules/measurement.module'
import { DatabaseModule } from './shared/db/database.module'
import { envSchema } from './shared/env/env'
import { EnvModule } from './shared/env/env.module'
import { ResponseInterceptor } from './shared/web/interceptors/response.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    CryptographyModule,
    DatabaseModule,
    MeasurementModule,
    ImagesModule,
    GeminiModule,
    // EmailModule, //this requires Resend API_KEY to work properly
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
