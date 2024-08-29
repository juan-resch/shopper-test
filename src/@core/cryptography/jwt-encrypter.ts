import { Injectable } from '@nestjs/common'
import { JwtService, type JwtSignOptions } from '@nestjs/jwt'

import { Encrypter } from './encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(
    payload: Record<string, unknown>,
    options?: JwtSignOptions
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options)
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    try {
      return await this.jwtService.verifyAsync(token)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
