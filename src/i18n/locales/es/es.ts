export const es = {
  auth: {
    middlewares: {
      validateAuthToken: {
        auth_token_missing: 'Se requiere un token de autorización',
        auth_token_invalid: 'El token de autorización proporcionado es inválido o está mal formado',
        internal_token_unauthorized: 'El token de servicio interno es incorrecto o no está autorizado',
      },
    },
    services: {
      authService: {
        expired_refresh: 'El token de actualización ya ha expirado',
        revoked_refresh: 'El token de actualización ha sido revocado y no puede usarse',
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
        email_not_found: 'No se encontró ninguna cuenta con el correo {{email}}.',
        username_not_found: 'No se encontró ninguna cuenta con el usuario {{username}}.',
        invalid_credentials: 'Correo, usuario o contraseña inválidos. Por favor, inténtalo de nuevo.',
        email_taken: 'El correo {{email}} ya está en uso.',
        username_taken: 'El nombre de usuario {{username}} ya está en uso.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: 'Se requiere {{token}} pero no fue proporcionado.',
          token_header_invalid: '{{token}} está mal formado o es inválido.',
          token_payload_invalid: '{{token}} contiene datos inválidos.',
        },
        verifyToken: {
          token_type_invalid: 'Tipo de token no coincide. Se esperaba "{{expectedType}}".',
          token_expired: 'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
        },
      },
      password: {
        passwordUtils: {
          invalid_credentials: 'Correo o contraseña incorrectos.',
        },
      },
    },
  },
  catalog: {
    application: {
      useCases: {
        gameUseCase: {
          game_not_found: 'No se encontró ningún juego con el ID proporcionado',
        },
      },
    },
    infrastructure: {
      adapters: {
        igdb: {
          igdbAuthAdapter: {
            wrong_provider: 'El proveedor actual no es IGDB. Por favor, revisa tu configuración.',
            invalid_format: 'La respuesta del token no tiene un formato válido',
            auth_failed: 'No se pudo autenticar con el proveedor. Por favor, revisa tus credenciales.',
          },
        },
        rawg: {
          rawgAuthAdapter: {
            wrong_provider: 'El proveedor actual no es RAWG. Por favor, revisa tu configuración.',
          },
        },
        authAdapter: {
          unsupported_provider: 'El proveedor seleccionado no está soportado o no tiene implementación de autenticación.',
        },
        categoryAdapter: {
          invalid_format: 'La respuesta de la lista de categorías no tiene un formato válido',
          fetch_failed: 'Ocurrió un error al recuperar las categorías del proveedor',
        },
        gameAdapter: {
          invalid_format: 'La respuesta de la lista de juegos no tiene un formato válido',
          fetch_failed: 'Ocurrió un error al recuperar los juegos del proveedor',
        },
      },
    },
    interfaces: {
      controllers: {
        gameController: {
          invalid_filters: 'Formato de filtros inválido en los parámetros de consulta.',
          invalid_id: 'Formato de ID de juego inválido en el parámetro de ruta.',
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
        identifier_required: 'Se requiere correo o usuario',
        password_required: 'Se requiere contraseña',
        identifier_invalid: 'Por favor, introduce un correo electrónico o usuario válido',
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
        password_confirm_required: 'Se requiere confirmación de la contraseña',
        password_mismatch: 'Las contraseñas deben coincidir',
      },
      UserEmail: {
        email_required: 'Se requiere correo electrónico',
        email_invalid: 'Formato de correo electrónico inválido',
        email_disposable: 'No se permiten correos electrónicos desechables',
      },
      UserName: {
        username_required: 'Se requiere nombre de usuario',
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
  notifications: {},
}
