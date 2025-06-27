import { createClient, RedisClientType } from 'redis'
import { TrackPlayError } from '@errors/index'
import { getLogger } from '@logger/index'
import { getI18n } from '@i18n/index'

const i18n = getI18n()
const log = getLogger()

let redisClient: RedisClientType | null = null

export type RedisOptions = {
  url: string
}

/**
 * Initializes and connects a shared Redis client with the given URL.
 *
 * This function must be called once during app bootstrap.
 *
 * @param options - Redis connection configuration
 */
export const startRedis = async ({ url }: RedisOptions): Promise<void> => {
  if (redisClient) {
    log.warn('Redis client already initialized. Skipping.')
    return
  }

  redisClient = createClient({ url })

  redisClient.on('error', (error) => {
    log.error('❌ Redis client error:', error)
  })

  try {
    await redisClient.connect()
    log.info('✅ Redis connected')
  } catch (error) {
    log.error('❌ Failed to connect to Redis:', error)
    process.exit(1)
  }
}

/**
 * Returns the initialized Redis client.
 *
 * @throws If called before `startRedis`
 */
export const getRedis = (): RedisClientType => {
  if (!redisClient) throw new TrackPlayError(i18n.t('core.clients.redis.uninitialized_client'))
  return redisClient
}
