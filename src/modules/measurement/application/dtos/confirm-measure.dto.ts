import { ApiProperty } from '@nestjs/swagger'

export class ConfirmMeasureDTO {
  @ApiProperty()
  measure_uuid: string

  @ApiProperty()
  confirmed_value: number
}
