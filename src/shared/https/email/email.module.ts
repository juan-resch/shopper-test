import { Module } from '@nestjs/common'

import { EmailService } from './email.service'

import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [EnvModule],
  providers: [EnvModule, EmailService],
})
export class EmailModule {}
