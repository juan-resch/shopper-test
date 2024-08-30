import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'
import { Injectable } from '@nestjs/common'

import { EnvService } from '@/shared/env/env.service'

@Injectable()
export class GeminiService extends GoogleGenerativeAI {
  constructor(private readonly envService: EnvService) {
    super(envService.get('GEMINI_API_KEY'))
  }

  getDefaultModel() {
    return this.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  getAIFileManager() {
    return new GoogleAIFileManager(this.envService.get('GEMINI_API_KEY'))
  }
}
