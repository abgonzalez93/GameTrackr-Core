import { inspect } from 'util'
import { type Logger } from 'winston'
import { type LogLevel } from './winston.logger.ts'
import { LOGGER } from '#constants/logger.constant'

const writeConsoleLine = (level: LogLevel, line: string): void => {
  const processStd = level === 'error' || level === 'warn' ? process.stderr : process.stdout
  processStd.write(line)
}

interface StartupLogEntry {
  ts: number
  level: LogLevel
  message: string
  meta?: Record<string, unknown>
}

const formatConsoleLine = (entry: StartupLogEntry, prefix: string, useColors: boolean): string => {
  const head = `${prefix} ${new Date(entry.ts).toISOString()} ${entry.level.toUpperCase()}: ${entry.message}`
  if (!entry.meta || Object.keys(entry.meta).length === 0) return `${head}\n`

  const metaSuffix = inspect(entry.meta, {
    depth: 6,
    colors: useColors,
    compact: true,
    maxArrayLength: 50,
    breakLength: 140,
  })

  return `${head} ${metaSuffix}\n`
}

interface StartupLogBufferOptions {
  maxEntries?: number
  prefix: string
  useColors?: boolean
}

export interface BufferLogger {
  debug: (message: string, meta?: Record<string, unknown>) => void
  info: (message: string, meta?: Record<string, unknown>) => void
  warn: (message: string, meta?: Record<string, unknown>) => void
  error: (message: string, meta?: Record<string, unknown>) => void

  flushToLogger: (logger: Logger) => void
  flushToConsole: () => void
}

export const initBufferLogger = (options: StartupLogBufferOptions): BufferLogger => {
  const { maxEntries = LOGGER.BUFFER.DEFAULT_MAX_ENTRIES, prefix, useColors = process.stdout.isTTY } = options

  const entries: StartupLogEntry[] = []

  const push = (level: LogLevel, message: string, meta?: Record<string, unknown>): void => {
    entries.push({ ts: Date.now(), level, message, meta })
    if (entries.length > maxEntries) entries.shift()
  }

  const flushToLogger = (logger: Logger): void => {
    for (const entry of entries) {
      if (entry.meta && Object.keys(entry.meta).length > 0) {
        logger.log(entry.level, entry.message, entry.meta)
      } else {
        logger.log(entry.level, entry.message)
      }
    }

    entries.length = 0
  }

  const flushToConsole = (): void => {
    for (const entry of entries) writeConsoleLine(entry.level, formatConsoleLine(entry, prefix, useColors))
    entries.length = 0
  }

  return {
    debug: (message, meta) => push('debug', message, meta),
    info: (message, meta) => push('info', message, meta),
    warn: (message, meta) => push('warn', message, meta),
    error: (message, meta) => push('error', message, meta),

    flushToLogger,
    flushToConsole,
  }
}
