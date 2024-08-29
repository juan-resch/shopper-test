import { Injectable } from '@nestjs/common'

import { Either, right } from '@/@core/either'

type GetHelloUseCaseResponse = Either<null, string>

@Injectable()
export class GetHelloUseCase {
  async execute(): Promise<GetHelloUseCaseResponse> {
    return right('Hello world')
  }
}
