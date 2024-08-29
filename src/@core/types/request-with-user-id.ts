import type { Request as EXRequest } from 'express'

export interface Request extends EXRequest {
  user: {
    id: string
  }
}
