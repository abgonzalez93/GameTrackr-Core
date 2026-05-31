import { format, type TransformableInfo } from 'logform'
import { isRecord } from '#utils/common.util'

export const serializeError = (error: unknown): Record<string, unknown> | unknown => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(error.cause ? { cause: serializeError(error.cause) } : undefined),
    }
  }

  if (isRecord(error)) return error
  return { value: String(error) }
}

export const serializeErrorFields = format((info: TransformableInfo): TransformableInfo => {
  if ('error' in info) info.error = serializeError(info.error)
  if ('err' in info) info.err = serializeError(info.err)
  return info
})

export const jsonReplacer = (value: unknown): unknown => {
  if (typeof value === 'bigint') return value.toString()
  return value
}
