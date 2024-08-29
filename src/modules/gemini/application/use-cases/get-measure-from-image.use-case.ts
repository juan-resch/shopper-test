import { Inject, Injectable, Logger } from '@nestjs/common'

import { GeminiService } from '../../services/google/gemini/gemini.service'

type GetMeasureFromImageResponse = { amount: number }
type GetMeasureFromImageParams = {
  imagePath: string
}

@Injectable()
export class GetMeasureFromImage {
  constructor(
    @Inject(GeminiService) private readonly geminiService: GeminiService
  ) {}

  async execute(
    params: GetMeasureFromImageParams
  ): Promise<GetMeasureFromImageResponse> {
    const model = this.geminiService.getDefaultModel()

    const fileManager = this.geminiService.getAIFileManager()

    const uploadResponse = await fileManager.uploadFile(params.imagePath, {
      mimeType: 'image/jpeg',
      displayName: 'Measurement',
    })

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: 'Eu preciso que extraia o valor dessa leitura de gás / água. Quero apenas o número da leitura e nada mais, pois preciso converter para number na minha aplicação',
      },
    ])

    const text = result.response.text()

    Logger.log(text)
    return { amount: parseFloat(text) }
  }
}
