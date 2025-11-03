import { LOGGER } from '#constants/logger'

export type LogLevel = (typeof LOGGER.LEVELS)[keyof typeof LOGGER.LEVELS]
