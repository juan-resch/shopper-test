import { NotFoundException } from '@nestjs/common'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { ListCustomerMeasureUseCase } from './list-customer-measures.use-case'

import {
  Measurement,
  MeasureTypes,
} from '@/modules/measurement/domain/entities/measurement.entity'
import { MeasurementsRepository } from '@/modules/measurement/domain/repositories/measurement.repository'

describe('ListCustomerMeasureUseCase', () => {
  let useCase: ListCustomerMeasureUseCase
  let measurementsRepository: MeasurementsRepository

  beforeEach(() => {
    measurementsRepository = {
      findBy: vi.fn(),
    } as unknown as MeasurementsRepository
    useCase = new ListCustomerMeasureUseCase(measurementsRepository)
  })

  it('should return an array of public measures if they exist', async () => {
    const measures = [
      new Measurement(/* params */),
      new Measurement(/* params */),
    ]
    vi.spyOn(measurementsRepository, 'findBy').mockResolvedValueOnce(measures)

    const result = await useCase.execute({
      customer_code: '1',
      measure_type: MeasureTypes.GAS,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(measures.map(Measurement.toPublic))
  })

  it('should return NotFoundException if no measures are found', async () => {
    vi.spyOn(measurementsRepository, 'findBy').mockResolvedValueOnce([])

    const result = await useCase.execute({ customer_code: '1' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundException)
  })
})
