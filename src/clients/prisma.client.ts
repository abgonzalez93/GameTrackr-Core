import { PrismaPg } from '@prisma/adapter-pg'
import { type Logger } from 'winston'
import { DatabaseConnectionError } from '#errors/infrastructure.error'

interface PrismaClientConstructor<T> {
  new (options: { adapter: PrismaPg }): T
}

interface PrismaClient {
  $connect(): Promise<void>
  $disconnect(): Promise<void>
}

export const createPrisma = <T extends PrismaClient>(
  ClientConstructor: PrismaClientConstructor<T>,
  databaseUrl: string,
): T => {
  const adapter = new PrismaPg({ connectionString: databaseUrl })
  return new ClientConstructor({ adapter })
}

export const connectPrisma = async (client: PrismaClient, logger: Logger): Promise<void> => {
  try {
    logger.info('⌛ Connecting to Prisma...')
    await client.$connect()
    logger.info('✅ Prisma connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Prisma', { error })
    throw new DatabaseConnectionError({
      message: 'Failed to connect to Prisma',
      errors: { error },
    })
  }
}

export const disconnectPrisma = async (client: PrismaClient, logger: Logger): Promise<void> => {
  try {
    logger.info('⌛ Disconnecting from Prisma...')
    await client.$disconnect()
    logger.info('✅ Prisma disconnected')
  } catch (error) {
    logger.error('❌ Failed to disconnect from Prisma', { error })
    throw new DatabaseConnectionError({
      message: 'Failed to disconnect from Prisma',
      errors: { error },
    })
  }
}
