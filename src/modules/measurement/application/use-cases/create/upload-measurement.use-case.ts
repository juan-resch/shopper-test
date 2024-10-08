import { ConflictException, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { Between } from 'typeorm'

import { Measurement } from '../../../domain/entities/measurement.entity'
import { MeasurementsRepository } from '../../../domain/repositories/measurement.repository'
import { UploadMeasurementDTO } from '../../dtos/upload-measurement.dto'

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
    private readonly measurementmentsRepository: MeasurementsRepository,
    private readonly imageService: ImageService,
    private readonly getMeasureFromImage: GetMeasureFromImage
  ) {}

  async execute(
    params: UploadMeasurementDTO
  ): Promise<UploadMeasurementUseCaseResponse> {
    const measureDate = moment(params.measure_datetime)

    const startMonth = new Date(
      moment({ month: measureDate.get('month') })
        .startOf('month')
        .format('YYYY-MM-DD')
    )
    const endMonth = new Date(
      moment({ month: measureDate.get('month') })
        .endOf('month')
        .format('YYYY-MM-DD')
    )

    const existingMeasurement = await this.measurementmentsRepository.count({
      where: {
        readDate: Between(startMonth, endMonth),
        type: params.measure_type,
        custumerCode: params.customer_code,
      },
    })

    if (existingMeasurement > 0)
      return left(
        new ConflictException('Leitura do mês já realizada', 'DOUBLE_REPORT')
      )

    const { temporaryLink, filePath } = await this.imageService.saveBase64Image(
      params.image
    )

    const { amount } = await this.getMeasureFromImage.execute({
      imagePath: filePath,
    })

    const measurement = Measurement.create({
      custumerCode: params.customer_code,
      type: params.measure_type,
      readDate: new Date(params.measure_datetime),
      imageBase64: params.image || null,
      imageURL: temporaryLink,
      value: amount,
    })

    const createdMeasure = await this.measurementmentsRepository.save(
      measurement
    )

    return right({
      image_url: temporaryLink,
      measure_uuid: createdMeasure.id,
      measure_value: amount,
    })
  }
}
