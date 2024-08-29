import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { CryptographyModule } from './@core/cryptography/modules/cryptography.module'
import { HelloModule } from './modules/hello/infra/modules/hello.module'
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
    HelloModule,
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
