import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'

import { ListCustomerMeasureUseCase } from '@/modules/measurement/application/use-cases/retrieve/list-customer-measures.use-case'
import { MeasureTypes } from '@/modules/measurement/domain/entities/measurement.entity'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const customerCodeSchema = z.string({ message: 'Customer Code inválido' })

const customerCodeValidationPipe = new ZodValidationPipe(customerCodeSchema)

@Controller('/:customer_code/list')
@ApiTags('Measurement')
export class ListCustomerMeasureController {
  constructor(
    private readonly listCustomerMeasureUseCase: ListCustomerMeasureUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Measurement list',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async handle(
    @Param('customer_code', customerCodeValidationPipe) customer_code: string,
    @Query('measure_type') measure_type: string
  ) {
    let type = undefined

    if (measure_type) {
      type = measure_type.toUpperCase()
    }

    if (type && (type != MeasureTypes.GAS || type != MeasureTypes.WATER))
      throw new BadRequestException(
        'Tipo de medição nãopermitida',
        'INVALID_TYPE'
      )

    const { value, isLeft } = await this.listCustomerMeasureUseCase.execute({
      customer_code,
      measure_type: type,
    })

    if (isLeft()) throw value

    return value
  }
}
