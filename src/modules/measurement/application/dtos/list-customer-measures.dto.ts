import { MeasureTypes } from '../../domain/entities/measurement.entity'

export class ListCustomerMeasuresDTO {
  measure_type?: MeasureTypes
  customer_code: string
}
