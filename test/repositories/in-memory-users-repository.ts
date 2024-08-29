import { Pagination, PaginationResponse } from '@/@core/pagination/pagination'
import { User } from '@/modules/user/domain/entities/user.entity'
import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(item: User): Promise<void> {
    this.users.push(item)
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((item) => item.id === user.id)

    this.users[index] = user
  }

  async findMany(
    page: number,
    pageSize: number
  ): Promise<PaginationResponse<User>> {
    return Pagination.paginate(this.users, {
      page,
      pageSize,
    })
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((element) => element.id.toString() === id) ?? null
  }

  async delete(item: User): Promise<void> {
    const index = this.users.findIndex((element) => element.id === item.id)

    this.users.splice(index, 1)
  }

  async findWith(key: keyof User, value: string): Promise<User> {
    return this.users.find((user) => user[key] === value) ?? null
  }
}
