import { ApiProperty } from '@nestjs/swagger'

import { MeasureTypes } from '../../domain/entities/measurement.entity'

export class UploadMeasurementDTO {
  @ApiProperty()
  image: string

  @ApiProperty()
  customer_code: string

  @ApiProperty()
  measure_datetime: string

  @ApiProperty({ enum: MeasureTypes })
  measure_type: MeasureTypes
}
