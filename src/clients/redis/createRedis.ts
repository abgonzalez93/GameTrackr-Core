import { type RedisClientType, createClient } from 'redis'

export const createRedis = (url: string): RedisClientType => createClient({ url })
