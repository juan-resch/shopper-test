import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

import { Measurementment } from '@/modules/measurement/domain/entities/measurement.entity'
import { MeasurementmentsRepository } from '@/modules/measurement/domain/repositories/measurement.repository'

const entities = [Measurementment]
const repositories = [MeasurementmentsRepository]

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        return {
          database: envService.get('DATABASE_NAME'),
          host: envService.get('DATABASE_HOST'),
          port: envService.get('DATABASE_PORT'),
          username: envService.get('DATABASE_USER'),
          password: envService.get('DATABASE_PASSWORD'),
          entities,
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
        }
      },
    }),
  ],
  providers: [...repositories],
  exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
