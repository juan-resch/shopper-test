import { Pagination, PaginationResponse } from './pagination'

describe('Pagination', () => {
  it('should be able to paginate data correctly with default options', () => {
    const totalRecords = 30
    const users = Array.from({ length: totalRecords }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    }))

    const result: PaginationResponse<(typeof users)[0]> =
      Pagination.paginate(users)

    expect(result.data).toHaveLength(10)
    expect(result.page).toBe(1)
    expect(result.totalRecords).toBe(totalRecords)
  })

  it('should be able to handle pagination with custom options', () => {
    const totalRecords = 20
    const page = 3
    const pageSize = 5
    const model = Array.from({ length: totalRecords }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    }))
    const result: PaginationResponse<(typeof model)[0]> = Pagination.paginate(
      model,
      {
        page,
        pageSize,
      }
    )

    expect(result.data).toHaveLength(pageSize)
    expect(result.data[0].id).toBe(11)
    expect(result.data[4].id).toBe(15)
    expect(result.page).toBe(page)
    expect(result.totalRecords).toBe(totalRecords)
  })

  it('should be able to return an empty array for a page beyond the total number of items', () => {
    const totalRecords = 20
    const model = Array.from({ length: totalRecords }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    }))
    const result: PaginationResponse<(typeof model)[0]> = Pagination.paginate(
      model,
      {
        page: 3,
        pageSize: 10,
      }
    )

    expect(result.data).toHaveLength(0) // page 1 = 10 records, then page 3 = 0
    expect(result.page).toBe(3)
    expect(result.totalRecords).toBe(totalRecords)
  })
})
