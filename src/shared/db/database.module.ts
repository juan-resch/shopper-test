import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

const entities = []
const repositories = []

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        const isDev = envService.get('NODE_ENV') === 'development'

        return {
          database: envService.get('DATABASE_NAME'),
          host: envService.get('DATABASE_HOST'),
          port: envService.get('DATABASE_PORT'),
          username: envService.get('DATABASE_USER'),
          password: envService.get('DATABASE_PASSWORD'),
          entities,
          type: 'postgres',
          synchronize: isDev,
          autoLoadEntities: isDev,
        }
      },
    }),
  ],
  providers: [...repositories],
  exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
