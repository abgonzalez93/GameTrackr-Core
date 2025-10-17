import { LOGGER } from '#constants/logger'

/**
 * **LogLevel**
 *
 * Type derived from {@link LOGGER}.
 * Ensures that all logger-related components share the same exact set of levels.
 */
export type LogLevel = (typeof LOGGER.LEVELS)[keyof typeof LOGGER.LEVELS]
