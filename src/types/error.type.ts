import { type Translatable } from './translate.type.ts'
import { type TrackPlayError } from '#errors/base.error'

export interface TrackPlayErrorConstructor {
  new (message: string | Translatable, details?: unknown): TrackPlayError
}
