import { Module } from '@nestjs/common'

import { UploadMeasurementUseCase } from '../../application/use-cases/upload-measurement.use-case'
import { UploadMeasurementController } from '../controllers/create/upload-measurement.controller'

import { GetMeasureFromImage } from '@/modules/gemini/application/use-cases/get-measure-from-image.use-case'
import { GeminiModule } from '@/modules/gemini/infra/modules/gemini.module'
import { ImagesModule } from '@/modules/images/infra/modules/images.module'
import { ImageService } from '@/modules/images/services/image/image.service'
import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [DatabaseModule, EnvModule, ImagesModule, GeminiModule],
  providers: [UploadMeasurementUseCase, ImageService, GetMeasureFromImage],
  controllers: [UploadMeasurementController],
})
export class MeasurementModule {}
