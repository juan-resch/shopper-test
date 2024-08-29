import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BcryptHasher } from '../bcrypt-hasher'
import { Encrypter } from '../encrypter'
import { HashComparer } from '../hash-comparer'
import { HashGenerator } from '../hash-generator'
import { JwtEncrypter } from '../jwt-encrypter'

@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
    JwtService,
  ],
  exports: [HashComparer, HashGenerator, Encrypter],
})
export class CryptographyModule {}
