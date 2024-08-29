import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from 'test/mappers/user-mapper'

import { UUID } from '@/@core/entities/uuid.entity'
import {
  JoinChannelType,
  Role,
  User,
  UserProps,
} from '@/modules/user/domain/entities/user.entity'
import { PrismaService } from '@/shared/db/prisma/prisma.service'

export class UserFactory {
  public static withMocks(override: Partial<UserProps> = {}, id?: UUID) {
    const user = User.create(
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        authorizedBy: new UUID(),
        avatar: faker.internet.url(),
        balance: 0,
        joinChannel: {
          status: 'ACCEPTED',
          channel: JoinChannelType.INVITE,
        },
        role: Role.CUSTOMER,
        ...override,
      },
      id
    )

    return user
  }
}

@Injectable()
export class PrismaUserFactory {
  constructor(private prisma: PrismaService) {}

  async withMocks(data: Partial<UserProps> = {}, id?: UUID): Promise<User> {
    const user = UserFactory.withMocks(data, id)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPersistence(user),
    })

    return user
  }
}
