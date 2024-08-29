import { Module } from '@nestjs/common'

import { GetMeasureFromImage } from '../../application/use-cases/get-measure-from-image.use-case'
import { GeminiService } from '../../services/google/gemini/gemini.service'

import { EnvModule } from '@/shared/env/env.module'
import { EnvService } from '@/shared/env/env.service'

@Module({
  imports: [EnvModule],
  exports: [GeminiService, GetMeasureFromImage],
  providers: [EnvService, GeminiService, GetMeasureFromImage],
})
export class GeminiModule {}
