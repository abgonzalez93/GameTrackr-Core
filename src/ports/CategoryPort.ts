import { CategoryList } from '#types/category/CategoryList'

/**
 * **CategoryPort**
 *
 * Defines the **infrastructure-level contract** for retrieving
 * game-related categories — such as genres, platforms, and themes —
 * from external game data providers.
 *
 * ### Responsibilities
 * - Fetch raw category data from an external provider.
 * - Normalize provider-specific structures into domain-safe {@link CategoryList} objects.
 *
 * ### Layer
 * - **Port (Infrastructure Contract)** — implemented by provider adapters (e.g., IGDB, RAWG).
 * - Consumed by the {@link CategoryService} at the application layer.
 */
export interface CategoryPort {
  /**
   * Retrieves all available game genres from the external provider.
   *
   * @returns A promise resolving to a normalized {@link CategoryList} of genres.
   */
  getGenres(): Promise<CategoryList>

  /**
   * Retrieves all available game platforms from the external provider.
   *
   * @returns A promise resolving to a normalized {@link CategoryList} of platforms.
   */
  getPlatforms(): Promise<CategoryList>

  /**
   * Retrieves all available game themes from the external provider.
   *
   * @returns A promise resolving to a normalized {@link CategoryList} of themes.
   */
  getThemes(): Promise<CategoryList>
}
