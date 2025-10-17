export const en = {
  auth: {
    application: {
      useCases: {
        token: {
          tokenUseCase: {
            expired_refresh: 'Refresh token is already expired',
            revoked_refresh: 'Refresh token has been revoked and cannot be used',
          },
        },
      },
    },
    infrastructure: {
      middlewares: {
        validateAuthToken: {
          auth_token_missing: 'Authorization token is required',
          auth_token_invalid: 'The provided authorization token is invalid or malformed',
          internal_token_unauthorized: 'The internal service token is incorrect or unauthorized',
        },
      },
    },
    interfaces: {
      controllers: {
        tokenController: {
          invalid_generate_input: 'The data provided to generate tokens is invalid',
          invalid_revoke_input: 'The data provided to revoke the token is invalid',
          invalid_revocation_status_input: 'The query parameters to check the token status are invalid',
          invalid_rotate_input: 'The data provided to rotate tokens is invalid',
        },
      },
    },
  },
  backend: {
    services: {
      trackGameService: {
        already_tracking: 'You are already tracking this game',
      },
      userService: {
        user_not_found_by_id: 'We couldn’t find a user with that ID',
        email_not_found: 'No account found with the email {{email}}',
        username_not_found: 'No account found with the username {{username}}',
        invalid_credentials: 'Invalid email, username or password. Please try again',
        email_taken: 'The email {{email}} is already in use',
        username_taken: 'The username {{username}} is already taken',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: '{{token}} is required but was not provided',
          token_header_invalid: '{{token}} is malformed or invalid',
          token_payload_invalid: '{{token}} contains invalid data',
        },
        verifyToken: {
          token_type_invalid: 'Token type mismatch. Expected "{{expectedType}}"',
          token_expired: 'Your session has expired or the token is invalid. Please log in again',
        },
      },
      password: {
        passwordUtils: {
          invalid_credentials: 'Incorrect email or password',
        },
      },
    },
  },
  catalog: {
    application: {
      useCases: {
        game: {
          gameUseCase: {
            game_not_found: 'No game found with the provided ID',
          },
        },
      },
    },
    infrastructure: {
      adapters: {
        auth: {
          igdbAuthAdapter: {
            invalid_format: 'Token response is not in a valid format',
            auth_failed: 'Unable to authenticate with provider. Please check your credentials',
          },
        },
        category: {
          igdbCategoryAdapter: {
            invalid_format: 'Category list response is not in a valid format',
          },
        },
        game: {
          igdbGameAdapter: {
            invalid_format: 'Game list response is not in a valid format',
          },
        },
      },
      utils: {
        container: {
          resolveAdapters: {
            unsupported_provider: 'The configured provider is not supported',
          },
        },
        provider: {
          fetchFromProvider: {
            unsupported_method: 'The selected provider is not supported or has no authentication implementation',
            fetch_failed: 'An error occurred while retrieving {{endpoint}} from provider',
          },
        },
      },
    },
    interfaces: {
      controllers: {
        gameController: {
          invalid_filters: 'Invalid filters format in query parameters',
          invalid_id: 'Invalid game ID format in path parameter',
        },
      },
    },
  },
  core: {
    config: {
      createEnvConfig: {
        invalid_configuration: 'Invalid {{section}} configuration',
      },
      getSecrets: {
        missing_secret: 'Missing Docker secret: {{secret}}',
        empty_secret: 'Empty Docker secret: {{secret}}',
        read_failed: 'Failed to read Docker secret: {{secret}}',
      },
    },
    middlewares: {
      createErrorHandler: {
        unexpected_error: 'Unexpected error',
      },
      createNotFoundHandler: {
        route_not_found: "The requested route '{{url}}' does not exist on this server",
      },
    },
    schemas: {
      base: {
        IpAddressSchema: {
          ip_address_invalid: 'The provided IP address is not valid',
        },
        NodeEnvSchema: {
          node_env_invalid: "NODE_ENV must be 'development', 'production', or 'test'",
        },
        NonEmptyStringSchema: {
          string_invalid: 'The value must be a string',
          string_empty: 'The string cannot be empty',
        },
        PortSchema: {
          port_invalid: 'The port must be a number between 1 and 9999',
        },
        UrlSchema: {
          url_invalid: 'The provided URL is invalid or malformed',
        },
      },
      login: {
        LoginInputSchema: {
          identifier_required: 'Email or username is required',
          password_required: 'Password is required',
          identifier_invalid: 'Please enter a valid email address or username',
        },
      },
      user: {
        CreateUserSchema: {
          password_invalid: 'Password must include uppercase, lowercase, number and special character',
          password_confirm_required: 'Password confirmation is required',
          password_mismatch: 'Passwords must match',
        },
        UserEmailSchema: {
          email_required: 'Email is required',
          email_invalid: 'Invalid email address format',
          email_disposable: 'Disposable email addresses are not allowed',
        },
        UserNameSchema: {
          username_required: 'Username is required',
          username_min: 'Username must be at least 3 characters',
          username_max: 'Username must be at most 30 characters',
          username_invalid: 'Only letters, numbers and underscores are allowed',
        },
      },
    },
    server: {
      bootstrap: {
        bootstrap_failed: 'The service failed to start due to a fatal error',
      },
    },
    utils: {
      validate: {
        validateSchema: {
          invalid_input: 'Invalid input',
        },
      },
    },
  },
  notifications: {},
}
