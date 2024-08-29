import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { GetHelloUseCase } from '@/modules/hello/application/use-cases/get-hello.use-case'

@Controller('/hello')
export class GetHelloController {
  constructor(private readonly getHelloUseCase: GetHelloUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async handle() {
    const { value } = await this.getHelloUseCase.execute()

    return value
  }
}
