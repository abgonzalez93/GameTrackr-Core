import type { CategoryList } from '#types/category.type'

export interface CategoryPort {
  getGenres(): Promise<CategoryList>
  getPlatforms(): Promise<CategoryList>
  getThemes(): Promise<CategoryList>
}
