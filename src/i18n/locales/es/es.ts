export const es = {
  auth: {
    middlewares: {
      validateAuthToken: {
        auth_token_missing: 'El token de autorización es obligatorio',
        auth_token_invalid: 'El token de autorización proporcionado es inválido o tiene un formato incorrecto',
        internal_token_unauthorized: 'El token interno del servicio es incorrecto o no está autorizado',
      },
    },
    services: {
      authService: {
        expired_refresh: 'El token de actualización ha expirado',
        revoked_refresh: 'El token de actualización ha sido revocado y no puede utilizarse',
      },
    },
  },
  backend: {
    services: {
      trackGameService: {
        already_tracking: 'Ya estás siguiendo este juego.',
      },
      userService: {
        user_not_found_by_id: 'No se encontró un usuario con ese ID.',
        email_not_found: 'No existe ninguna cuenta con el correo {{email}}.',
        username_not_found: 'No existe ninguna cuenta con el nombre de usuario {{username}}.',
        invalid_credentials: 'Correo electrónico, nombre de usuario o contraseña inválidos. Inténtalo de nuevo.',
        email_taken: 'El correo {{email}} ya está en uso.',
        username_taken: 'El nombre de usuario {{username}} ya está en uso.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: '{{token}} es obligatorio pero no fue proporcionado.',
          token_header_invalid: '{{token}} tiene un formato incorrecto o es inválido.',
          token_payload_invalid: '{{token}} contiene datos inválidos.',
        },
        verifyToken: {
          token_type_invalid: 'Tipo de token no válido. Se esperaba "{{expectedType}}".',
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
        game: {
          gameUseCase: {
            game_not_found: 'No se encontró ningún juego con el ID proporcionado',
          },
        },
      },
    },
    infrastructure: {
      adapters: {
        auth: {
          igdbAuthAdapter: {
            auth_failed: 'No se pudo autenticar con el proveedor. Verifica tus credenciales.',
            invalid_format: 'La respuesta del token no tiene un formato válido',
          },
        },
        category: {
          igdbCategoryAdapter: {
            invalid_format: 'La respuesta de la lista de categorías no tiene un formato válido',
          },
        },
        game: {
          igdbGameAdapter: {
            invalid_format: 'La respuesta de la lista de juegos no tiene un formato válido',
          },
        },
      },
      utils: {
        container: {
          resolveAdapters: {
            unsupported_provider: 'El proveedor configurado no es compatible',
          },
        },
        provider: {
          fetchFromProvider: {
            unsupported_method:
              'El proveedor seleccionado no es compatible o no tiene una implementación de autenticación.',
            fetch_failed: 'Ocurrió un error al obtener {{endpoint}} del proveedor',
          },
        },
      },
    },
    interfaces: {
      controllers: {
        gameController: {
          invalid_filters: 'El formato de los filtros en los parámetros de consulta es inválido.',
          invalid_id: 'El formato del ID del juego en el parámetro de ruta es inválido.',
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
        identifier_required: 'Se requiere un correo electrónico o nombre de usuario',
        password_required: 'La contraseña es obligatoria',
        identifier_invalid: 'Por favor, introduce un correo electrónico o nombre de usuario válido',
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
        email_required: 'El correo electrónico es obligatorio',
        email_invalid: 'Formato de correo electrónico inválido',
        email_disposable: 'No se permiten correos electrónicos temporales o desechables',
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
        invalid_key_type: 'La clave de traducción debe ser una cadena de texto',
      },
    },
  },
  notifications: {},
}
