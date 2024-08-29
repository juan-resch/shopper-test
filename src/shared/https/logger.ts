import { withScope, captureException } from '@sentry/node'

import { ENVIRONMENTS } from '../utils/constants'

/**
 * Describes logging functions that log error and information messages.
 */
interface Logger {
  /**
   * Logs an error message and error object. In production, sends the error to Sentry.
   *
   * @param message - The error message to log.
   * @param error - The error object to be logged and sent to Sentry.
   * @returns {void}
   */
  error(message: string, error: unknown): void
  /**
   * Logs an informational message and context. This is primarily for non-critical information logging.
   * In production, the context is sent to Sentry as an informational event.
   *
   * @param message - The informational message to log.
   * @returns {void}
   */
  info(message: string): void
}

/**
 * Base function to handle logging and error reporting
 * Logs messages and errors to the console in non-production environments
 * In production, it sends the error to Sentry with additional message context.
 *
 * @param message - The message associated with the erorr or information
 * @param error - The error object or any informational context to be logged.
 * @param level - The severity level of the log ('error' or 'info')
 */
function base(message: string, error: unknown, level: 'error' | 'info'): void {
  const isProduction = process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION

  if (isProduction) {
    withScope((scope) => {
      scope.setLevel(level)
      scope.setExtras({ message })
      captureException(error)
    })
  } else {
    // eslint-disable-next-line no-console
    console.log(message, error)
  }
}

export const logger: Logger = {
  error: (message: string, error: unknown) => base(message, error, 'error'),
  info: (message: string) => base(message, null, 'info'),
}
