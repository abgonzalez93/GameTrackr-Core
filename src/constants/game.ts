/**
 * Neutral Game constants used by the backend.
 *
 * Defines the canonical fields and sorting options for the `Game` entity
 * as understood by the backend domain (agnostic of providers like IGDB).
 */
export const GAME = {
  MAX_GAME_LIMIT: 50,
  GAME_FIELDS: [
    'igdb_id',
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
  GAME_SORT_FIELDS: ['title', 'releaseDate', 'rating'] as const,
}
