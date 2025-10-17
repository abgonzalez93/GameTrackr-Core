/**
 * **GAME Constant**
 *
 * Defines canonical, provider-agnostic constants for the `Game` entity
 * within the backend domain.
 *
 * ### Scope
 * - Declares all recognized `Game` fields managed by the backend.
 * - Provides allowed sorting keys and default filters for query operations.
 * - Serves as a reference point for mappers, adapters, and use cases.
 *
 * ### Notes
 * - These constants are **domain-level**, meaning they remain stable
 *   even if provider APIs change.
 * - Used by query builders (e.g., {@link buildIGDBQuery}) and mapping
 *   functions (e.g., {@link toIGDBFilters}).
 * - The `MAX_GAME_LIMIT` prevents excessive payload sizes
 *   during search operations.
 */
export const GAME = {
  /**
   * Maximum allowed number of games to return in a single query.
   */
  MAX_GAME_LIMIT: 50,

  /**
   * Default filters applied when no user-provided filters are given.
   */
  DEFAULT_FILTERS: {
    sortBy: 'releaseDate',
    sortOrder: 'desc',
    limit: 50,
  },

  /**
   * Canonical list of all recognized domain-level fields for {@link Game}.
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
  ],

  /**
   * List of domain-level sort fields available for game queries.
   */
  GAME_SORT_FIELDS: ['title', 'releaseDate', 'rating'],
} as const
