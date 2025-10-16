export const es = {
  auth: {
    application: {
      useCases: {
        token: {
          tokenUseCase: {
            expired_refresh: 'El token de actualización ya ha expirado.',
            revoked_refresh: 'El token de actualización ha sido revocado y no puede usarse.',
          },
        },
      },
    },
    infrastructure: {
      middlewares: {
        validateAuthToken: {
          auth_token_missing: 'Se requiere un token de autorización.',
          auth_token_invalid: 'El token de autorización proporcionado es inválido o está mal formado.',
          internal_token_unauthorized: 'El token interno del servicio es incorrecto o no está autorizado.',
        },
      },
    },
    interfaces: {
      controllers: {
        tokenController: {
          invalid_generate_input: 'Los datos proporcionados para generar los tokens son inválidos.',
          invalid_revoke_input: 'Los datos proporcionados para revocar el token son inválidos.',
          invalid_revocation_status_input: 'Los parámetros de consulta para verificar el estado del token son inválidos.',
          invalid_rotate_input: 'Los datos proporcionados para rotar los tokens son inválidos.',
        },
      },
    },
  },
  backend: {
    services: {
      trackGameService: {
        already_tracking: 'Ya estás siguiendo este juego.',
      },
      userService: {
        user_not_found_by_id: 'No se pudo encontrar un usuario con ese ID.',
        email_not_found: 'No se encontró ninguna cuenta con el correo {{email}}.',
        username_not_found: 'No se encontró ninguna cuenta con el nombre de usuario {{username}}.',
        invalid_credentials: 'Correo electrónico, nombre de usuario o contraseña inválidos. Inténtalo de nuevo.',
        email_taken: 'El correo {{email}} ya está en uso.',
        username_taken: 'El nombre de usuario {{username}} ya está en uso.',
      },
    },
    utils: {
      auth: {
        requireToken: {
          token_missing: 'Se requiere {{token}}, pero no se proporcionó.',
          token_header_invalid: '{{token}} está mal formado o es inválido.',
          token_payload_invalid: '{{token}} contiene datos inválidos.',
        },
        verifyToken: {
          token_type_invalid: 'Tipo de token incorrecto. Se esperaba "{{expectedType}}".',
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
            game_not_found: 'No se encontró ningún juego con el ID proporcionado.',
          },
        },
      },
    },
    infrastructure: {
      adapters: {
        auth: {
          igdbAuthAdapter: {
            invalid_format: 'La respuesta del token no tiene un formato válido.',
            auth_failed: 'No se pudo autenticar con el proveedor. Verifica tus credenciales.',
          },
        },
        category: {
          igdbCategoryAdapter: {
            invalid_format: 'La respuesta de la lista de categorías no tiene un formato válido.',
          },
        },
        game: {
          igdbGameAdapter: {
            invalid_format: 'La respuesta de la lista de juegos no tiene un formato válido.',
          },
        },
      },
      utils: {
        container: {
          resolveAdapters: {
            unsupported_provider: 'El proveedor configurado no es compatible.',
          },
        },
        provider: {
          fetchFromProvider: {
            unsupported_method: 'El proveedor seleccionado no es compatible o no tiene implementación de autenticación.',
            fetch_failed: 'Ocurrió un error al obtener {{endpoint}} del proveedor.',
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
        unexpected_error: 'Error inesperado.',
      },
      createNotFoundHandler: {
        route_not_found: "La ruta solicitada '{{url}}' no existe en este servidor.",
      },
    },
    schemas: {
      login: {
        LoginInputSchema: {
          identifier_required: 'Se requiere un correo electrónico o nombre de usuario.',
          password_required: 'Se requiere una contraseña.',
          identifier_invalid: 'Por favor, introduce un correo electrónico o nombre de usuario válido.',
        },
      },
      user: {
        CreateUserSchema: {
          password_invalid: 'La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial.',
          password_confirm_required: 'Se requiere la confirmación de la contraseña.',
          password_mismatch: 'Las contraseñas deben coincidir.',
        },
        UserEmailSchema: {
          email_required: 'Se requiere un correo electrónico.',
          email_invalid: 'Formato de correo electrónico inválido.',
          email_disposable: 'No se permiten correos electrónicos temporales o desechables.',
        },
        UserNameSchema: {
          username_required: 'Se requiere un nombre de usuario.',
          username_min: 'El nombre de usuario debe tener al menos 3 caracteres.',
          username_max: 'El nombre de usuario debe tener como máximo 30 caracteres.',
          username_invalid: 'Solo se permiten letras, números y guiones bajos.',
        },
      },
    },
    utils: {
      validate: {
        validateSchema: {
          invalid_input: 'Entrada inválida.',
        },
      },
      translate: {
        formatErrorMessage: {
          invalid_key: 'Clave de traducción inválida.',
          invalid_key_type: 'La clave de traducción debe ser una cadena.',
        },
      },
    },
  },
  notifications: {},
}
