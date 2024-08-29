import * as fs from 'fs'
import * as path from 'path'

import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { EnvService } from '@/shared/env/env.service'
import { ROOT_DIR } from '@/shared/utils/constants'

type SaveBase64Response = {
  fileName: string
  temporaryLink: string
  filePath: string
}

@Injectable()
export class ImageService {
  constructor(private readonly envService: EnvService) {}

  async saveBase64Image(base64Data: string): Promise<SaveBase64Response> {
    const buffer = Buffer.from(base64Data, 'base64')
    const fileName = `${uuidv4()}.png`
    const filePath = path.join(ROOT_DIR, 'uploads', fileName)

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }

    fs.writeFileSync(filePath, buffer)

    const temporaryLink = this.getTemporaryLink(fileName)

    return { fileName, temporaryLink, filePath }
  }

  private getTemporaryLink(fileName: string): string {
    const api_url = this.envService.get('API_URL')

    const link = `${api_url}/uploads/${fileName}`
    return link
  }
}
