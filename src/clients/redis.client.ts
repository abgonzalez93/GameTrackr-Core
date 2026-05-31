import type { RedisClientOptions, RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis'
import { createClient } from 'redis'
import { type Logger } from 'winston'
import { RedisConnectionError } from '#errors/infrastructure.error'

export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts, 3>

export const createRedis = (options: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts, 3>): RedisClient =>
  createClient(options)

export const connectRedis = async (client: RedisClient, logger: Logger): Promise<void> => {
  try {
    logger.info('⌛ Connecting to Redis...')
    await client.connect()
    logger.info('✅ Redis connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Redis', { error })
    throw new RedisConnectionError({
      message: 'Failed to connect to Redis',
      errors: { error },
    })
  }
}

export const disconnectRedis = async (client: RedisClient, logger: Logger): Promise<void> => {
  try {
    logger.info('⌛ Disconnecting from Redis...')
    await client.quit()
    logger.info('✅ Redis disconnected')
  } catch (error) {
    logger.error('❌ Failed to disconnect from Redis', { error })
    throw new RedisConnectionError({
      message: 'Failed to disconnect from Redis',
      errors: { error },
    })
  }
}
