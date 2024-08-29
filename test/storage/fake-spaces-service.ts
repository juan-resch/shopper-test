import { Injectable } from '@nestjs/common'

import { UUID } from '@/@core/entities/uuid.entity'

@Injectable()
export class FakeSpacesService {
  public uploadedObjects: { url: string; key: string; bucket: string }[] = []
  public deletedObjects: string[] = []

  async uploadObject({
    file,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ACL,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Metadata,
    Bucket,
  }: {
    file: Express.Multer.File
    ACL: string
    Metadata?: { [key: string]: string }
    Bucket?: string
  }): Promise<{ url: string; key: string; bucket: string }> {
    const key = `${Date.now()}_${file.originalname}`
    const url = `https://fake-bucket-${new UUID().toString()}.s3.fake-region.amazonaws.com/${key}`
    const bucket = Bucket || 'fake-bucket'

    const uploadedObject = { url, key, bucket }
    this.uploadedObjects.push(uploadedObject)

    return uploadedObject
  }

  async deleteObject(url: string): Promise<void> {
    this.deletedObjects.push(url)
  }
}
