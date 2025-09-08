import { en } from './locales'

type Paths<T, K extends keyof T = keyof T, Depth extends readonly unknown[] = []> = Depth['length'] extends 4
  ? never
  : K extends string
    ? T[K] extends Record<string, unknown>
      ? T[K] extends readonly unknown[]
        ? K
        : `${K}` | `${K}.${Paths<T[K], keyof T[K], [...Depth, unknown]>}`
      : K
    : never

type Messages = typeof en

export type AuthPath = `auth.${Paths<Messages['auth']>}`
export type BackendPath = `backend.${Paths<Messages['backend']>}`
export type CorePath = `core.${Paths<Messages['core']>}`
export type IgdbPath = `igdb.${Paths<Messages['igdb']>}`
export type NotificationsPath = `notifications.${Paths<Messages['notifications']>}`
