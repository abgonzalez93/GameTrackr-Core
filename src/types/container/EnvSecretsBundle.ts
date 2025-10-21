/**
 * **EnvSecretsBundle**
 *
 * Represents the resolved environment variables and secrets
 * injected into the dependency factories.
 */
export interface EnvSecretsBundle<TEnvSchema> {
  env: TEnvSchema
  secrets: Record<string, string>
}
