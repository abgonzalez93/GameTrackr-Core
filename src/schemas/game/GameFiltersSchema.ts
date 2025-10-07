import { z } from 'zod'

/**
 * **GameFiltersSchema**
 *
 * Zod schema defining **neutral filtering and sorting options** for searching games
 * in a provider-agnostic way.
 *
 * ### Purpose
 * Represents the standardized filter structure used by the domain and application layers
 * to query games, regardless of the external data provider (e.g., IGDB, RAWG, Steam).
 *
 * External adapters (see: IGDB, RAWG) are responsible for mapping these neutral filters
 * into provider-specific query formats.
 *
 * ### Behavior
 * - Accepts partial filter objects — all fields are optional.
 * - Enforces sensible validation ranges:
 *   - `limit` between 1 and 50 (to avoid overfetching).
 *   - `offset` ≥ 0.
 *   - `minRating` between 0 and 100.
 * - Supports basic pagination, sorting, and filtering by text, categories, and rating.
 *
 * ### Fields
 * | Field        | Type                    | Description |
 * |---------------|------------------------|--------------|
 * | `query`       | `string?`              | Search term (e.g. game title) |
 * | `limit`       | `number?` (1–50)       | Max results to return |
 * | `offset`      | `number?` (≥ 0)        | Pagination offset |
 * | `sortBy`      | `'title' \| 'releaseDate' \| 'rating'?` | Sorting field |
 * | `sortOrder`   | `'asc' \| 'desc'?`     | Sort direction |
 * | `minRating`   | `number?` (0–100)      | Minimum rating threshold |
 * | `genres`      | `string[]?`            | List of genre slugs or names |
 * | `platforms`   | `string[]?`            | List of platform identifiers |
 * | `themes`      | `string[]?`            | List of thematic categories |
 *
 */
export const GameFiltersSchema = z.object({
  query: z.string().optional(),
  limit: z.number().min(1).max(50).optional(),
  offset: z.number().min(0).optional(),
  sortBy: z.enum(['title', 'releaseDate', 'rating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  minRating: z.number().min(0).max(100).optional(),
  genres: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  themes: z.array(z.string()).optional(),
})
