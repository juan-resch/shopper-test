import { ConflictException, NotFoundException } from '@nestjs/common'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { ConfirmMeasureUseCase } from './confirm-measure.use-case'
import { Measurement } from '../../../domain/entities/measurement.entity'
import { MeasurementsRepository } from '../../../domain/repositories/measurement.repository'

describe('ConfirmMeasureUseCase', () => {
  let useCase: ConfirmMeasureUseCase
  let measurementsRepository: MeasurementsRepository

  beforeEach(() => {
    measurementsRepository = {
      findOneBy: vi.fn(),
      save: vi.fn(),
    } as unknown as MeasurementsRepository

    useCase = new ConfirmMeasureUseCase(measurementsRepository)
  })

  it('should return NotFoundException if the measure is not found', async () => {
    vi.spyOn(measurementsRepository, 'findOneBy').mockResolvedValueOnce(null)

    const result = await useCase.execute({
      measure_uuid: 'uuid-123',
      confirmed_value: 100,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundException)
    expect(result.value.message).toBe('Leitura não encontrada')
  })

  it('should return ConflictException if the measure is already confirmed', async () => {
    const confirmedMeasure = new Measurement()
    confirmedMeasure.confirmed = true

    vi.spyOn(measurementsRepository, 'findOneBy').mockResolvedValueOnce(
      confirmedMeasure
    )

    const result = await useCase.execute({
      measure_uuid: 'uuid-123',
      confirmed_value: 100,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ConflictException)
    expect(result.value.message).toBe('Leitura já confirmada')
  })

  it('should confirm the measure if it is not already confirmed', async () => {
    const measure = new Measurement()
    measure.confirmed = false

    vi.spyOn(measurementsRepository, 'findOneBy').mockResolvedValueOnce(measure)
    vi.spyOn(measurementsRepository, 'save').mockResolvedValueOnce(measure)

    const result = await useCase.execute({
      measure_uuid: 'uuid-123',
      confirmed_value: 100,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
    expect(measure.confirmed).toBe(true)
    expect(measure.value).toBe(100)
  })
})
