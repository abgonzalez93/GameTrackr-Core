export const es = {
  auth: {
    middlewares: {
      validateAuthToken: {
        auth_token_missing: 'El token de autorización es obligatorio',
        auth_token_invalid: 'El token de autorización proporcionado no es válido o está mal formado',
        internal_token_unauthorized: 'El token de servicio interno es incorrecto o no está autorizado',
      },
    },
    services: {
      authService: {
        expired_refresh: 'El token de refresco ya ha expirado',
        revoked_refresh: 'El token de refresco ha sido revocado y no puede usarse',
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
        email_not_found: 'No se encontró ninguna cuenta con el email {{email}}.',
        username_not_found: 'No se encontró ninguna cuenta con el nombre de usuario {{username}}.',
        invalid_credentials: 'Correo electrónico, nombre de usuario o contraseña no válidos. Inténtalo de nuevo.',
        email_taken: 'El email {{email}} ya está en uso.',
        username_taken: 'El nombre de usuario {{username}} ya está en uso.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: '{{token}} es obligatorio pero no fue proporcionado.',
          token_header_invalid: '{{token}} está mal formado o no es válido.',
          token_payload_invalid: '{{token}} contiene datos no válidos.',
        },
        verifyToken: {
          token_type_invalid: 'El tipo de token no coincide. Se esperaba "{{expectedType}}".',
          token_expired: 'Tu sesión ha expirado o el token no es válido. Inicia sesión de nuevo.',
        },
      },
      mappers: {
        toPublicUser: {
          invalid_format: 'Formato de datos de usuario inesperado. Contacta con soporte.',
        },
      },
      password: {
        passwordUtils: {
          invalid_credentials: 'Correo electrónico o contraseña incorrectos.',
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
        identifier_required: 'El correo electrónico o el nombre de usuario son obligatorios',
        password_required: 'La contraseña es obligatoria',
        identifier_invalid: 'Introduce una dirección de correo electrónico o un nombre de usuario válido',
      },
      shared: {
        ip_invalid: 'Introduce una dirección IP válida',
        string_empty: 'Este campo no puede estar vacío',
        url_invalid: 'Introduce una URL válida',
        number_invalid: 'Este campo debe ser un número',
        number_integer: 'Este campo debe ser un número entero',
        number_positive: 'Este campo debe ser un número positivo',
        port_range: 'El puerto debe estar entre 1 y 9999',
      },
      CreateUser: {
        password_invalid: 'La contraseña debe incluir mayúsculas, minúsculas, números y un carácter especial',
        password_confirm_required: 'La confirmación de contraseña es obligatoria',
        password_mismatch: 'Las contraseñas deben coincidir',
      },
      UserEmail: {
        email_required: 'El correo electrónico es obligatorio',
        email_invalid: 'Formato de correo electrónico no válido',
        email_disposable: 'No se permiten direcciones de correo desechables',
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
        parseOrThrow: {
          invalid_input: 'Entrada no válida',
        },
      },
      translate: {
        invalid_key: 'Clave de traducción inválida',
        invalid_key_type: 'La clave de traducción debe ser un string',
      },
    },
  },
  igdb: {
    services: {
      igdbService: {
        token_invalid_format: 'La respuesta del token de IGDB no tiene un formato válido',
        auth_failed: 'No se pudo autenticar con IGDB. Verifica tus credenciales.',
        games_invalid_format: 'La respuesta de la lista de juegos de IGDB no tiene un formato válido',
        games_fetch_failed: 'Ocurrió un error al recuperar los juegos desde IGDB',
        game_not_found: 'No se encontró ningún juego con el ID de IGDB proporcionado',
        game_invalid_format: 'La respuesta del juego de IGDB no tiene un formato válido',
        game_fetch_failed: 'Ocurrió un error al obtener los detalles del juego desde IGDB',
      },
    },
  },
  notifications: {},
}
