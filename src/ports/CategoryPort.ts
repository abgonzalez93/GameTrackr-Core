import { CategoryList } from '@schemas/index'

/**
 * Port defining the contract for retrieving game-related categories
 * (genres, platforms, themes) from any external game provider.
 *
 * Implementations must normalize provider-specific structures into
 * domain-neutral {@link CategoryList} objects.
 */
export interface CategoryPort {
  /**
   * Retrieves all available genres from the provider.
   *
   * @returns {Promise<CategoryList>} A normalized list of genre categories.
   */
  getGenres(): Promise<CategoryList>

  /**
   * Retrieves all available platforms from the provider.
   *
   * @returns {Promise<CategoryList>} A normalized list of platform categories.
   */
  getPlatforms(): Promise<CategoryList>

  /**
   * Retrieves all available themes from the provider.
   *
   * @returns {Promise<CategoryList>} A normalized list of theme categories.
   */
  getThemes(): Promise<CategoryList>
}
