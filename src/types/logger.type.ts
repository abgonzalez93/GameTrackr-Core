import { LOGGER } from '#constants/logger.constant'

export type LogLevel = (typeof LOGGER.LEVELS)[keyof typeof LOGGER.LEVELS]
