import { z } from 'zod'

import { ENVIRONMENTS } from '../utils/constants'

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(ENVIRONMENTS),
  WEB_APPLICATION_URL: z.string().url(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform((value) => parseInt(value)),
  RESEND_API_KEY: z.string(),
  JWT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>
