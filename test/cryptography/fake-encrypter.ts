import { Encrypter } from '@/modules/user/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    try {
      return JSON.parse(token)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
