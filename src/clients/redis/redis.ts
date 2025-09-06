import { RedisClientType, createClient } from 'redis'
import { Logger } from 'winston'

/**
 * Creates a Redis client instance.
 *
 * @param url - The URL of the Redis server.
 * @returns A Redis client instance.
 */
export const createRedis = (url: string): RedisClientType => createClient({ url })

/**
 * Connects to the Redis server using the provided client.
 *
 * @param client - The Redis client instance.
 * @param logger - The Wiston logger instance.
 */
export const connectRedis = async (client: RedisClientType, logger: Logger): Promise<void> => {
  try {
    await client.connect()
    logger.info('✅ Redis connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error)
    process.exit(1)
  }
}
