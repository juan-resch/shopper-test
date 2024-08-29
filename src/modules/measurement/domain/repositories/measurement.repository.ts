import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { Measurementment } from '../entities/measurement.entity'

@Injectable()
export class MeasurementmentsRepository extends Repository<Measurementment> {
  constructor(private dataSource: DataSource) {
    super(Measurementment, dataSource.createEntityManager())
  }
}
