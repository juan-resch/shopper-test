import { Multer } from 'multer'

declare namespace Express {
  export interface Request {
    user?: {
      id: string
    }
    file?: Multer
  }
}
