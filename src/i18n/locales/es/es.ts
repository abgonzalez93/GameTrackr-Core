export const es = {
  auth: {
    middlewares: {
      validateAuthToken: {
        auth_token_missing: 'El token de autorización es obligatorio',
        auth_token_invalid: 'El token de autorización proporcionado es inválido o está malformado',
        internal_token_unauthorized: 'El token de servicio interno es incorrecto o no está autorizado',
      },
    },
    services: {
      authService: {
        expired_refresh: 'El refresh token ya ha expirado',
        revoked_refresh: 'El refresh token ha sido revocado y no puede utilizarse',
      },
    },
  },
  backend: {
    services: {
      trackGameService: {
        already_tracking: 'Ya estás siguiendo este juego.',
      },
      userService: {
        user_not_found_by_id: 'No pudimos encontrar un usuario con ese ID.',
        email_not_found: 'No existe ninguna cuenta con el email {{email}}.',
        username_not_found: 'No existe ninguna cuenta con el nombre de usuario {{username}}.',
        invalid_credentials: 'Email, nombre de usuario o contraseña inválidos. Por favor, inténtalo de nuevo.',
        email_taken: 'El email {{email}} ya está en uso.',
        username_taken: 'El nombre de usuario {{username}} ya está en uso.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: '{{token}} es obligatorio pero no fue proporcionado.',
          token_header_invalid: '{{token}} está malformado o es inválido.',
          token_payload_invalid: '{{token}} contiene datos inválidos.',
        },
        verifyToken: {
          token_type_invalid: 'Tipo de token no coincide. Se esperaba "{{expectedType}}".',
          token_expired: 'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
        },
      },
      password: {
        passwordUtils: {
          invalid_credentials: 'Email o contraseña incorrectos.',
        },
      },
    },
  },
  core: {
    middlewares: {
      createErrorHandler: {
        buildErrorResponse: {
          unexpected_error: 'Error inesperado',
        },
      },
      createNotFoundHandler: {
        route_not_found: "La ruta solicitada '{{url}}' no existe en este servidor.",
      },
    },
    schemas: {
      login: {
        identifier_required: 'El email o nombre de usuario es obligatorio',
        password_required: 'La contraseña es obligatoria',
        identifier_invalid: 'Por favor, introduce un email o nombre de usuario válido',
      },
      shared: {
        ip_invalid: 'Por favor, introduce una dirección IP válida',
        string_empty: 'Este campo no puede estar vacío',
        url_invalid: 'Por favor, introduce una URL válida',
        number_invalid: 'Este campo debe ser un número',
        number_integer: 'Este campo debe ser un número entero',
        number_positive: 'Este campo debe ser un número positivo',
        port_range: 'El puerto debe estar entre 1 y 9999',
      },
      CreateUser: {
        password_invalid: 'La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial',
        password_confirm_required: 'La confirmación de la contraseña es obligatoria',
        password_mismatch: 'Las contraseñas deben coincidir',
      },
      UserEmail: {
        email_required: 'El email es obligatorio',
        email_invalid: 'Formato de dirección de email inválido',
        email_disposable: 'No se permiten direcciones de email desechables',
      },
      UserName: {
        username_required: 'El nombre de usuario es obligatorio',
        username_min: 'El nombre de usuario debe tener al menos 3 caracteres',
        username_max: 'El nombre de usuario debe tener como máximo 30 caracteres',
        username_invalid: 'Solo se permiten letras, números y guiones bajos',
      },
    },
    utils: {
      parse: {
        validateSchema: {
          invalid_input: 'Entrada inválida',
        },
      },
      translate: {
        invalid_key: 'Clave de traducción inválida',
        invalid_key_type: 'La clave de traducción debe ser una cadena',
      },
    },
  },
  igdb: {
    controllers: {
      igdbController: {
        invalid_filters: 'Formato de filtros inválido en los parámetros de la query.',
        invalid_id: 'Formato de ID de juego inválido en el parámetro de la ruta.',
      },
    },
    services: {
      igdbAuthService: {
        token_invalid_format: 'La respuesta del token de IGDB no tiene un formato válido',
        auth_failed: 'No se pudo autenticar con IGDB. Por favor, revisa tus credenciales.',
      },
      igdbGameService: {
        games_invalid_format: 'La respuesta de la lista de juegos de IGDB no tiene un formato válido',
        games_fetch_failed: 'Ocurrió un error al obtener los juegos desde IGDB',
        game_not_found: 'No se encontró ningún juego con el ID de IGDB proporcionado',
      },
      igdbGenreService: {
        genres_invalid_format: 'La respuesta de la lista de géneros de IGDB no tiene un formato válido',
        genres_fetch_failed: 'Ocurrió un error al obtener los géneros desde IGDB',
      },
      igdbPlatformService: {
        platforms_invalid_format: 'La respuesta de la lista de plataformas de IGDB no tiene un formato válido',
        platforms_fetch_failed: 'Ocurrió un error al obtener las plataformas desde IGDB',
      },
      igdbThemeService: {
        themes_invalid_format: 'La respuesta de la lista de temáticas de IGDB no tiene un formato válido',
        themes_fetch_failed: 'Ocurrió un error al obtener las temáticas desde IGDB',
      },
    },
  },
  notifications: {},
}
