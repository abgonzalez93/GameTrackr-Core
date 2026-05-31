export const en = {
  core: {
    errors: {
      generic: 'An unexpected error occurred',
      bad_request: 'Invalid request data',
      unauthorized: 'Authentication required',
      forbidden: 'Access denied',
      not_found: 'Resource not found',
      conflict: 'Resource conflict',
      validation_failed: 'Validation failed',
      too_many_requests: 'Too many requests',
      internal_server_error: 'Unexpected system error',
      service_unavailable: 'Service temporarily unavailable',
      unexpected: 'An unexpected error occurred',
      route_not_found: "The route '{{url}}' does not exist",
      redis_connection: 'Could not connect to Redis',
      database_connection: 'Could not connect to the database',
    },
    validation: {
      required: 'This field is required',
      invalid_format: 'Invalid format',
      string: {
        base: 'Value must be a text string',
        empty: 'Text cannot be empty',
      },
      number: {
        base: 'Value must be a number',
        integer: 'Value must be an integer',
        positive: 'Value must be a positive number',
      },
      date: {
        invalid: 'Invalid date format',
      },
      email: {
        invalid: 'Invalid email address',
      },
      id: {
        invalid: 'Invalid ID format',
      },
      uuid: {
        invalid: 'Invalid UUID format',
      },
      url: {
        invalid: 'Invalid URL format',
      },
    },
  },
  auth: {
    token: {
      missing: 'Authorization token is required',
      invalid: 'Token is invalid or malformed',
      expired: 'Session expired. Please log in again',
      revoked: 'Token has been revoked',
      type_mismatch: 'Invalid token type. Expected "{{expectedType}}"',
      internal_invalid: 'Internal service token rejected',
    },
    login: {
      failed: 'Incorrect email or password',
      credentials_invalid: 'Invalid email, username or password',
    },
    management: {
      invalid_input_generate: 'Invalid data for token generation',
      invalid_input_revoke: 'Invalid data for token revocation',
      invalid_input_rotate: 'Invalid data for token rotation',
    },
  },
  users: {
    not_found: 'User not found',
    not_found_id: 'User with ID {{id}} not found',
    not_found_email: 'No account found for {{email}}',
    not_found_username: 'No account found for {{username}}',
    exists_email: 'Email {{email}} is already in use',
    exists_username: 'Username {{username}} is already taken',
    validation: {
      username_pattern: 'Only letters, numbers and underscores allowed',
      username_length: 'Username must be between 3 and 30 characters',
      password_complexity: 'Password needs uppercase, lowercase, number and special char',
      password_mismatch: 'Passwords do not match',
      email_disposable: 'Disposable emails are not allowed',
    },
  },
  catalog: {
    games: {
      fetch_failed: 'Failed to fetch games from provider',
      not_found: 'Game not found',
      invalid_id: 'Invalid game ID format',
      invalid_format: 'Invalid game data format',
      tracking_exists: 'You are already tracking this game',
    },
    platforms: {
      fetch_failed: 'Failed to fetch platforms from provider',
      not_found: 'Platform not found',
      invalid_id: 'Invalid platform ID format',
      invalid_format: 'Invalid platform data format',
    },
    themes: {
      fetch_failed: 'Failed to fetch themes from provider',
      not_found: 'Theme not found',
      invalid_id: 'Invalid theme ID format',
      invalid_format: 'Invalid theme data format',
    },
    genres: {
      fetch_failed: 'Failed to fetch genres from provider',
      not_found: 'Genre not found',
      invalid_id: 'Invalid genre ID format',
      invalid_format: 'Invalid genre data format',
    },
    filters: {
      invalid_format: 'Invalid query filters format',
      search_sort_conflict: 'Cannot sort results when performing a text search',
    },
    mapper: {
      provider_data_null: 'Provider data is null or undefined',
      domain_entity_null: 'Domain entity is null or undefined',
      persistence_entity_null: 'Persistence entity is null or undefined',
    },
    providers: {
      request_failed: 'Provider request failed with status {{status}}',
      fetch_error: 'Error fetching data from provider endpoint {{endpoint}}',
      invalid_response: 'Provider returned an invalid format',
      connection_failed: 'Failed to connect to provider',
      auth_failed: 'Provider authentication failed',
    },
  },
  notifications: {},
}
