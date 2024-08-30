import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'

import { UploadMeasurementDTO } from '@/modules/measurement/application/dtos/upload-measurement.dto'
import { UploadMeasurementUseCase } from '@/modules/measurement/application/use-cases/create/upload-measurement.use-case'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  image: z.string().base64('Base64 inválido'),
  customer_code: z.string(),
  measure_datetime: z.string().date('Forneça uma data válida'),
  measure_type: z.enum(['WATER', 'GAS']),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/upload')
@ApiTags('Measurement')
export class UploadMeasurementController {
  constructor(
    private readonly uploadMeasurementUseCase: UploadMeasurementUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Measurement uploaded successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConflictResponse({
    description: 'Conflict',
  })
  async handle(@Body(validationPipe) data: UploadMeasurementDTO) {
    const { value, isLeft } = await this.uploadMeasurementUseCase.execute(data)

    if (isLeft()) throw value

    return value
  }
}
