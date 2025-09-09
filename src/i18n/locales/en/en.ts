export const en = {
  auth: {
    middlewares: {
      validateAuthToken: {
        auth_token_missing: 'Authorization token is required',
        auth_token_invalid: 'The provided authorization token is invalid or malformed',
        internal_token_unauthorized: 'The internal service token is incorrect or unauthorized',
      },
    },
    services: {
      authService: {
        expired_refresh: 'Refresh token is already expired',
        revoked_refresh: 'Refresh token has been revoked and cannot be used',
      },
    },
  },
  backend: {
    services: {
      trackGameService: {
        already_tracking: 'You are already tracking this game.',
      },
      userService: {
        user_not_found_by_id: 'We couldn’t find a user with that ID.',
        email_not_found: 'No account found with the email {{email}}.',
        username_not_found: 'No account found with the username {{username}}.',
        invalid_credentials: 'Invalid email, username or password. Please try again.',
        email_taken: 'The email {{email}} is already in use.',
        username_taken: 'The username {{username}} is already taken.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: '{{token}} is required but was not provided.',
          token_header_invalid: '{{token}} is malformed or invalid.',
          token_payload_invalid: '{{token}} contains invalid data.',
        },
        verifyToken: {
          token_type_invalid: 'Token type mismatch. Expected "{{expectedType}}".',
          token_expired: 'Your session has expired or the token is invalid. Please log in again.',
        },
      },
      mappers: {
        toPublicUser: {
          invalid_format: 'Unexpected user data format. Please contact support.',
        },
      },
      password: {
        passwordUtils: {
          invalid_credentials: 'Incorrect email or password.',
        },
      },
    },
  },
  core: {
    middlewares: {
      createErrorHandler: {
        buildErrorResponse: {
          unexpected_error: 'Unexpected error',
        },
      },
      createNotFoundHandler: {
        route_not_found: "The requested route '{{url}}' does not exist on this server.",
      },
    },
    schemas: {
      login: {
        identifier_required: 'Email or username is required',
        password_required: 'Password is required',
        identifier_invalid: 'Please enter a valid email address or username',
      },
      shared: {
        ip_invalid: 'Please enter a valid IP address',
        string_empty: 'This field cannot be empty',
        url_invalid: 'Please enter a valid URL',
        number_invalid: 'This field must be a number',
        number_integer: 'This field must be an integer number',
        number_positive: 'This field must be a positive number',
        port_range: 'Port must be between 1 and 9999',
      },
      CreateUser: {
        password_invalid: 'Password must include uppercase, lowercase, number and special character',
        password_confirm_required: 'Password confirmation is required',
        password_mismatch: 'Passwords must match',
      },
      UserEmail: {
        email_required: 'Email is required',
        email_invalid: 'Invalid email address format',
        email_disposable: 'Disposable email addresses are not allowed',
      },
      UserName: {
        username_required: 'Username is required',
        username_min: 'Username must be at least 3 characters',
        username_max: 'Username must be at most 30 characters',
        username_invalid: 'Only letters, numbers and underscores are allowed',
      },
    },
    utils: {
      parse: {
        parseOrThrow: {
          invalid_input: 'Invalid input',
        },
      },
      translate: {
        invalid_key: 'Invalid translation key',
        invalid_key_type: 'Translation key must be a string',
      },
    },
  },
  igdb: {
    services: {
      igdbService: {
        token_invalid_format: 'IGDB token response is not in a valid format',
        auth_failed: 'Unable to authenticate with IGDB. Please check your credentials.',
        games_invalid_format: 'IGDB game list response is not in a valid format',
        games_fetch_failed: 'An error occurred while retrieving games from IGDB',
        game_not_found: 'No game found with the provided IGDB ID',
        game_invalid_format: 'IGDB game response is not in a valid format',
        game_fetch_failed: 'An error occurred while fetching the game details from IGDB',
      },
    },
  },
  notifications: {},
}
