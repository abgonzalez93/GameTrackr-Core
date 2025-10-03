/**
 * **GAME Constant**
 *
 * Defines canonical, provider-agnostic constants for the `Game` entity
 * within the backend domain.
 *
 * ### Scope
 * - Declares all recognized `Game` fields managed by the backend.
 * - Provides allowed sorting keys for query operations.
 * - Serves as a reference point for mappers and adapters translating
 *   between provider-specific schemas (e.g., IGDB, RAWG) and the domain model.
 *
 * ### Notes
 * - These constants are **domain-level**, meaning they remain stable
 *   even if provider APIs change.
 * - Used by query builders such as {@link buildIGDBQuery} and mapping
 *   functions like {@link toIGDBFilters}.
 * - The `MAX_GAME_LIMIT` constant prevents excessive payload sizes
 *   during search operations.
 *
 * @see {@link buildIGDBQuery}
 * @see {@link toIGDBFilters}
 */
export const GAME = {
  /**
   * Maximum allowed number of games to return in a single query.
   */
  MAX_GAME_LIMIT: 50,

  /**
   * Canonical list of all recognized domain-level fields for {@link Game}.
   *
   * These field names are used internally and may differ from provider
   * field names (e.g., `title` → `name`, `releaseDate` → `first_release_date`).
   */
  GAME_FIELDS: [
    'igdb_id',
    'rawg_id',
    'title',
    'slug',
    'summary',
    'storyline',
    'rating',
    'aggregated_rating',
    'total_rating',
    'hypes',
    'first_release_date',
    'cover',
    'genres',
    'platforms',
    'themes',
    'provider',
    'url',
    'updatedAt',
    'createdAt',
  ] as const,

  /**
   * List of domain-level sort fields available for game queries.
   *
   * These map to provider-specific sort keys (e.g., via {@link toIGDBFilters}).
   */
  GAME_SORT_FIELDS: ['title', 'releaseDate', 'rating'] as const,
}
