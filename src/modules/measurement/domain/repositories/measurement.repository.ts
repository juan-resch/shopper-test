import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { Measurement } from '../entities/measurement.entity'

@Injectable()
export class MeasurementsRepository extends Repository<Measurement> {
  constructor(private dataSource: DataSource) {
    super(Measurement, dataSource.createEntityManager())
  }
}
