import type { z, ZodType } from 'zod'
import { ValidationError, type HttpErrorConstructor } from '#errors/http.error'

interface FormattedIssue {
  path: string
  message: string
  code: string
  expected?: string
  received?: string
}

const formatZodIssues = (issues: z.core.$ZodIssue[]): FormattedIssue[] => {
  return issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
    expected: 'expected' in issue ? String(issue.expected) : undefined,
    received: 'received' in issue ? String(issue.received) : undefined,
  }))
}

interface ValidateOptions {
  message?: string
  i18nKey?: string
  i18nArgs?: Record<string, unknown>
  ErrorClass?: HttpErrorConstructor
}

export const validateSchema = <Schema extends ZodType>(
  schema: Schema,
  data: unknown,
  options: ValidateOptions = {},
): z.infer<Schema> => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    const { ErrorClass = ValidationError, message, i18nKey, i18nArgs } = options
    const issues = formatZodIssues(parsed.error.issues)

    throw new ErrorClass({
      message,
      i18nKey,
      i18nArgs,
      errors: issues,
    })
  }

  return parsed.data
}
