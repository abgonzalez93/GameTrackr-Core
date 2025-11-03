import { type CategoryList } from '#types/category/CategoryList'

export interface CategoryPort {
  getGenres(): Promise<CategoryList>
  getPlatforms(): Promise<CategoryList>
  getThemes(): Promise<CategoryList>
}
