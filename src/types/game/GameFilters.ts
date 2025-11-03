import { z } from 'zod'
import { GameFiltersSchema } from '#schemas/game/GameFiltersSchema'

export type GameFilters = z.infer<typeof GameFiltersSchema>
