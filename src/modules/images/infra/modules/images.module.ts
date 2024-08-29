import { join } from 'path'

import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { GeminiService } from '../../../gemini/services/google/gemini/gemini.service'
import { ImageService } from '../../services/image/image.service'

import { EnvModule } from '@/shared/env/env.module'
import { EnvService } from '@/shared/env/env.service'
import { ROOT_DIR } from '@/shared/utils/constants'
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(ROOT_DIR, 'uploads'),
      serveRoot: '/uploads',
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [ImageService, EnvService, GeminiService],
})
export class ImagesModule {}
