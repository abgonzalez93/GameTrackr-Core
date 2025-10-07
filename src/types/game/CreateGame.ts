import { CreateGameSchema } from '#schemas/game/CreateGameSchema'
import { z } from 'zod'

/**
 * **CreateGame**
 *
 * Type alias inferred from {@link CreateGameSchema}.
 *
 * Represents the **input payload** for creating a new `Game` entity.
 * Used by application services, controllers, or external adapters
 * that handle incoming data before persisting it to the database.
 *
 * ### Notes
 * - Provides strong runtime validation for new game data.
 * - Commonly used in **repository adapters** or **HTTP controllers** handling game creation.
 * - Ensures consistent structure across all provider integrations.
 *
 * @see {@link CreateGameSchema}
 * @see {@link Game}
 * @see {@link GameList}
 */
export type CreateGame = z.infer<typeof CreateGameSchema>
