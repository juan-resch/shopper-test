import { ApiProperty } from '@nestjs/swagger'

export function createApiPaginatedData<T>(itemType: new () => T) {
  class ApiPaginatedData {
    @ApiProperty({ example: 1, required: false })
    page: number

    @ApiProperty({ example: 1 })
    totalRecords: number

    @ApiProperty({ type: () => [itemType] })
    data: T[]
  }

  return ApiPaginatedData
}

export interface ApiPaginatedDataResponse<T> {
  page: number
  totalRecords: number
  data: T[]
}
