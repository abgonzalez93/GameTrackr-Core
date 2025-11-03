import { type RedisClientType } from 'redis'
import { type Logger } from 'winston'

export const connectRedis = async (client: RedisClientType, logger: Logger): Promise<void> => {
  try {
    await client.connect()
    logger.info('✅ Redis connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error)
    process.exit(1)
  }
}
