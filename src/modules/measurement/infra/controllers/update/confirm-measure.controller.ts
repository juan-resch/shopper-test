import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'

import { ConfirmMeasureDTO } from '@/modules/measurement/application/dtos/confirm-measure.dto'
import { ConfirmMeasureUseCase } from '@/modules/measurement/application/use-cases/update/confirm-measure.use-case'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  measure_uuid: z.string().uuid('UUID inválido'),
  confirmed_value: z.number().min(0, 'O número deve ser maior ou igual a 0'),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/confirm')
@ApiTags('Measurement')
export class ConfirmMeasureController {
  constructor(private readonly confirmMeasureUseCase: ConfirmMeasureUseCase) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Measurement confirmed',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConflictResponse({
    description: 'Conflict',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async handle(@Body(validationPipe) data: ConfirmMeasureDTO) {
    const { value, isLeft } = await this.confirmMeasureUseCase.execute(data)

    if (isLeft()) throw value

    return value
  }
}
