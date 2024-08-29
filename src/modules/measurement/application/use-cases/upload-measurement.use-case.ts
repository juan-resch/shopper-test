import { ConflictException, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { Between } from 'typeorm'

import { Measurementment } from '../../domain/entities/measurement.entity'
import { MeasurementmentsRepository } from '../../domain/repositories/measurement.repository'
import { UploadMeasurementDTO } from '../dtos/upload-measurement.dto'

import { Either, left, right } from '@/@core/either'
import { GetMeasureFromImage } from '@/modules/gemini/application/use-cases/get-measure-from-image.use-case'
import { ImageService } from '@/modules/images/services/image/image.service'

type UploadMeasurementUseCaseResponse = Either<
  ConflictException,
  {
    image_url: string
    measure_value: number
    measure_uuid: string
  }
>

@Injectable()
export class UploadMeasurementUseCase {
  constructor(
    private readonly measurementmentsRepository: MeasurementmentsRepository,
    private readonly imageService: ImageService,
    private readonly getMeasureFromImage: GetMeasureFromImage
  ) {}

  async execute(
    params: UploadMeasurementDTO
  ): Promise<UploadMeasurementUseCaseResponse> {
    const startMonth = moment({ day: 1 }).toDate()
    const endMonth = moment({ day: 31 }).toDate()

    const existingMeasurement = await this.measurementmentsRepository.count({
      where: {
        createdAt: Between(startMonth, endMonth),
        custumerCode: params.customer_code,
      },
    })

    if (existingMeasurement > 0)
      return left(new ConflictException('Leitura do mês já realizada'))

    const measurement = Measurementment.create({
      custumerCode: params.customer_code,
      type: params.measure_type,
      image: params.image || null,
    })

    const createdMeasure = await this.measurementmentsRepository.save(
      measurement
    )

    const { temporaryLink, filePath } = await this.imageService.saveBase64Image(
      params.image
    )

    const { amount } = await this.getMeasureFromImage.execute({
      imagePath: filePath,
    })

    return right({
      image_url: temporaryLink,
      measure_uuid: createdMeasure.id,
      measure_value: amount,
    })
  }
}
