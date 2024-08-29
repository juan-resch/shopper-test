import { User as PrismaUser, Prisma } from '@prisma/client'

import { UUID } from '@/@core/entities/uuid.entity'
import { User } from '@/modules/user/domain/entities/user.entity'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        updatedAt: raw.updatedAt ? raw.updatedAt : null,
      },
      new UUID(raw.id)
    )
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user?.id.toString(),
      name: user?.name,
      email: user?.email,
      password: user?.password,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    }
  }
}
