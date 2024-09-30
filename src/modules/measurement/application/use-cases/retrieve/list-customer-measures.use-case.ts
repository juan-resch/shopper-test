import { Injectable, NotFoundException } from '@nestjs/common'

import { ListCustomerMeasuresDTO } from '../../dtos/list-customer-measures.dto'

import { Either, left, right } from '@/@core/either'
import {
  Measurement,
  PublicMeasure,
} from '@/modules/measurement/domain/entities/measurement.entity'
import { MeasurementsRepository } from '@/modules/measurement/domain/repositories/measurement.repository'

type ListCustomerMeasureUseCaseResponse = Either<
  NotFoundException,
  {
    customer_code: string
    measures: PublicMeasure[]
  }
>

@Injectable()
export class ListCustomerMeasureUseCase {
  constructor(
    private readonly measurementmentsRepository: MeasurementsRepository
  ) {}

  async execute(
    params: ListCustomerMeasuresDTO
  ): Promise<ListCustomerMeasureUseCaseResponse> {
    const result = await this.measurementmentsRepository.findBy({
      custumerCode: params.customer_code,
      type: params.measure_type ? params.measure_type : undefined,
    })

    if (result.length == 0)
      return left(
        new NotFoundException(
          'Nenhuma leitura encontrada',
          'MEASURES_NOT_FOUND'
        )
      )

    return right({
      customer_code: params.customer_code,
      measures: result.map(Measurement.toPublic),
    })
  }
}
