import { Module } from '@nestjs/common'

import { UploadMeasurementUseCase } from '../../application/use-cases/create/upload-measurement.use-case'
import { ListCustomerMeasureUseCase } from '../../application/use-cases/retrieve/list-customer-measures.use-case'
import { ConfirmMeasureUseCase } from '../../application/use-cases/update/confirm-measure.use-case'
import { UploadMeasurementController } from '../controllers/create/upload-measurement.controller'
import { ListCustomerMeasureController } from '../controllers/retrieve/list-customer-measures.controller'
import { ConfirmMeasureController } from '../controllers/update/confirm-measure.controller'

import { GetMeasureFromImage } from '@/modules/gemini/application/use-cases/get-measure-from-image.use-case'
import { GeminiModule } from '@/modules/gemini/infra/modules/gemini.module'
import { ImagesModule } from '@/modules/images/infra/modules/images.module'
import { ImageService } from '@/modules/images/services/image/image.service'
import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [DatabaseModule, EnvModule, ImagesModule, GeminiModule],
  providers: [
    UploadMeasurementUseCase,
    ConfirmMeasureUseCase,
    ListCustomerMeasureUseCase,
    ImageService,
    GetMeasureFromImage,
  ],
  controllers: [
    UploadMeasurementController,
    ConfirmMeasureController,
    ListCustomerMeasureController,
  ],
})
export class MeasurementModule {}
