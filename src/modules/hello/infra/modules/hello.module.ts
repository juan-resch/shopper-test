import { Module } from '@nestjs/common'

import { GetHelloUseCase } from '../../application/use-cases/get-hello.use-case'
import { GetHelloController } from '../controllers/retrieve/get-hello.controller'

@Module({
  imports: [],
  providers: [GetHelloUseCase],
  controllers: [GetHelloController],
})
export class HelloModule {}
