import { type ConfigValues } from '#types/config/ConfigValues'

export interface GetEnvOptions {
  runtimeEnv?: ConfigValues
  emptyStringAsUndefined?: boolean
}
