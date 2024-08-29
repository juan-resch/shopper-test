import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common'
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core'
import * as Sentry from '@sentry/node'

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  handleUnknownError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exception: any,
    host: ArgumentsHost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    applicationRef: HttpServer<any, any> | AbstractHttpAdapter<any, any, any>
  ): void {
    Sentry.captureException(exception)
    super.handleUnknownError(exception, host, applicationRef)
  }
}
