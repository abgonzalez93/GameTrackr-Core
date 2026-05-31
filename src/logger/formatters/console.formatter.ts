import { inspect } from 'util'
import type { Format, TransformableInfo } from 'logform'
import { format } from 'winston'
import { isRecord } from '#utils/common.util'

const { printf } = format

const INSPECT_OPTIONS = {
  depth: 6,
  colors: true,
  compact: true,
  maxArrayLength: 50,
  breakLength: 140,
}

const formatHttpRequest = (meta: Record<string, unknown>, ts: unknown, loggerLabel: unknown, level: unknown): string => {
  const ctx = isRecord(meta.context) ? meta.context : {}
  const method = String(ctx.method || 'UNKNOWN')
  const path = String(ctx.path || '/')
  const status = Number(ctx.status || 0)
  const duration = String(ctx.durationMs || 0)

  const statusColor = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : status >= 300 ? '\x1b[36m' : '\x1b[32m'
  const resetColor = '\x1b[0m'
  const methodColor = '\x1b[35m'

  let logLine = `[${String(ts)}] [${String(loggerLabel)}] ${String(level)}: ${methodColor}${method}${resetColor} ${path} ${statusColor}(${status})${resetColor} - ${duration}ms`

  if (isRecord(meta.error)) {
    const error = meta.error
    const errorCode = error.code ? ` (${error.code})` : ''
    const errorTitle = error.title || 'Error'
    const errorMessage = error.message || ''

    logLine += `\n${statusColor}Error: ${errorTitle}${errorCode}${resetColor}`
    if (errorMessage) logLine += `\n${errorMessage}`

    if (Array.isArray(error.errors)) {
      const formattedErrors = error.errors.map((e: unknown) => inspect(e, { ...INSPECT_OPTIONS, depth: 1 })).join(',\n')
      logLine += `\nValidation Errors:\n${formattedErrors}`
    }

    if (status >= 500 && error.stack) {
      logLine += `\n${String(error.stack)
        .split('\n')
        .map((l) => '' + l)
        .join('\n')}`
    }
  }

  return logLine
}

const formatStandardLog = (
  meta: Record<string, unknown>,
  ts: unknown,
  loggerLabel: unknown,
  level: unknown,
  message: unknown,
): string => {
  const metaKeys = Object.keys(meta).filter((key) => meta[key] !== undefined)
  const cleanMeta = metaKeys.reduce<Record<string, unknown>>((acc, key) => {
    acc[key] = meta[key]
    return acc
  }, {})

  const metaSuffix = metaKeys.length > 0 ? ` ${inspect(cleanMeta, INSPECT_OPTIONS)}` : ''
  return `[${String(ts)}] [${String(loggerLabel)}] ${String(level)}: ${String(message)}${metaSuffix}`
}

export const createConsoleFormat = (): Format => {
  return printf((info: TransformableInfo): string => {
    const { level, message, label: loggerLabel, timestamp: ts, ...meta } = info
    const msg = String(message)

    if (msg.startsWith('HTTP Request') && isRecord(meta.context)) {
      return formatHttpRequest(meta, ts, loggerLabel, level)
    }

    return formatStandardLog(meta, ts, loggerLabel, level, message)
  })
}
