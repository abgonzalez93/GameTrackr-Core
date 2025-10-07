import { type Express } from 'express'
import { type Logger } from 'winston'
import { type i18n } from 'i18next'

/**
 * **ServiceRuntime**
 *
 * Defines the **live runtime context** of a running TrackPlay service.
 * Represents the fully initialized environment returned after a successful
 * {@link bootstrap} — including the configured Express app, logger, and i18n layer.
 *
 * ### Purpose
 * Provides a structured reference to the core runtime components
 * that remain active throughout the lifecycle of a TrackPlay service.
 *
 * ### Structure
 * - `app`: The initialized Express application, ready to handle requests.
 * - `logger`: Winston logger instance configured during bootstrap.
 * - `i18n`: i18next instance containing all loaded translations.
 *
 * ### Usage
 * Commonly returned or exposed from a service’s bootstrap sequence
 * to support testing, runtime diagnostics, or graceful shutdown.
 *
 * @see {@link bootstrap}
 * @see {@link createLogger}
 * @see {@link createI18n}
 */
export interface ServiceRuntime {
  /** Initialized Express application instance. */
  app: Express

  /** Winston logger configured for the current service. */
  logger: Logger

  /** i18next instance initialized with available translations. */
  i18n: i18n
}
