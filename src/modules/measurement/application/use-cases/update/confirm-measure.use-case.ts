import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { MeasurementsRepository } from '../../../domain/repositories/measurement.repository'
import { ConfirmMeasureDTO } from '../../dtos/confirm-measure.dto'

import { Either, left, right } from '@/@core/either'

type ConfirmMeasureUseCaseResponse = Either<
  ConflictException | NotFoundException,
  null
>

@Injectable()
export class ConfirmMeasureUseCase {
  constructor(
    private readonly measurementmentsRepository: MeasurementsRepository
  ) {}

  async execute(
    params: ConfirmMeasureDTO
  ): Promise<ConfirmMeasureUseCaseResponse> {
    const measure = await this.measurementmentsRepository.findOneBy({
      id: params.measure_uuid,
    })

    if (!measure)
      return left(
        new NotFoundException('Leitura não encontrada', 'MEASURE_NOT_FOUND')
      )

    if (measure.confirmed)
      return left(
        new ConflictException(
          'Leitura já confirmada',
          'CONFIRMATION_DUPLICATED'
        )
      )

    measure.value = params.confirmed_value
    measure.confirmed = true

    await this.measurementmentsRepository.save(measure)

    return right(null)
  }
}
