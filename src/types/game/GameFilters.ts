import { GameFiltersSchema } from '#schemas/game/GameFiltersSchema'
import { z } from 'zod'

/**
 * **GameFilters**
 *
 * Type alias inferred from {@link GameFiltersSchema}.
 *
 * Represents the **domain-neutral filtering options** used when searching
 * for games across different external providers (IGDB, RAWG, Steam, etc.).
 *
 * These filters are defined at the **application level** and later mapped
 * to provider-specific query formats by infrastructure adapters.
 *
 * ### Notes
 * - Designed to be **provider-agnostic** — adapters convert it to native API queries.
 * - Commonly used by {@link GamePort} implementations.
 * - Supports pagination, sorting, and domain-level filtering.
 *
 * @see {@link GameFiltersSchema}
 * @see {@link Game}
 * @see {@link GameList}
 */
export type GameFilters = z.infer<typeof GameFiltersSchema>
