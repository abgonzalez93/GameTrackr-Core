# 🧩 @trackplay/core

**TrackPlay Core** es el paquete base que centraliza **toda la lógica, tipos y recursos compartidos** entre los distintos servicios y aplicaciones de la plataforma TrackPlay
(ej. `trackplay-auth`, `trackplay-catalog`, `trackplay-notifications`, `trackplay-frontend`, etc.).

Su objetivo es mantener el código **DRY**, **tipado**, **modular** y **consistente** en todos los entornos.

---

## 📦 Contenido

El paquete incluye:

### ✅ Clients

- Clientes reutilizables para servicios externos (ej. `createRedis`).
- Proveen una capa de abstracción sobre dependencias de terceros.
- Pensados para inyección de dependencias y testabilidad.

### ✅ Config

- `createEnvConfig`: valida y tipa las variables de entorno mediante Zod.
  - Soporte dual para entornos servidor/cliente.
  - Normaliza cadenas vacías a `undefined` para evitar errores silenciosos.
  - Expone tipos inferidos en tiempo de compilación (`z.infer`).
  - Controla exposición pública mediante prefijo (`NEXT_PUBLIC_`).
  - Lanza errores tipados en caso de archivos ausentes o vacíos.
- `getSecrets`: gestiona la lectura segura de secretos desde `/run/secrets` o variables de entorno.
  - Lanza errores tipados en caso de archivos ausentes o vacíos.

### ✅ Constants

- Conjunto de valores fijos y enumeraciones: `HTTP_STATUS`, `JWT_CONFIG`, `GAME_CONSTANTS`, etc.
- Garantizan coherencia y evitan “magic numbers” o strings duplicados.

### ✅ Errors

- Sistema unificado de errores basado en clases tipadas y jerárquicas.
- Agrupados por dominio funcional:
  - `/base` → `TrackPlayError`.
  - `/config` → `EnvValidationError`, `SecretValidationError`.
  - `/http` → `BadRequestError`, `UnauthorizedError`, `ConflictError`, etc.
- Totalmente integrados con el sistema de traducciones (`i18next`).
- Compatibles con el middleware global de manejo de errores.

### ✅ i18n

- Basado en `i18next` con soporte multilenguaje.
- Carga modular de traducciones desde cada módulo.

### ✅ Logger

- Wrapper de Winston con configuración estándar y coloreado por entorno.
- Soporta etiquetas de servicio (`label`), niveles (`info`, `error`, `debug`) y salida formateada.
- Usado en la inicialización y en el flujo de errores global.

### ✅ Middlewares

- Middlewares genéricos para Express:
  - `applyMiddlewares`: aplicación masiva de middlewares.
  - `createErrorHandler`: gestión centralizada de errores.
  - `createNotFoundHandler`: control de rutas inexistentes.
- Configurables mediante opciones (`MiddlewareOptions`).

### ✅ Ports

- Interfaces contractuales que definen los límites entre dominio e infraestructura.
- Permiten sustituir adaptadores sin romper la lógica de negocio.

### ✅ Routes

- Estandarizar cómo los módulos de la aplicación registran sus rutas dentro de Express.
- Mantener el desacoplamiento total entre el framework web y la lógica de negocio.
- Favorecer la composición y testabilidad de los módulos HTTP, sin dependencias directas del contenedor ni del servidor principal.

### ✅ Schemas (Zod)

- Esquemas de validación centralizados por dominio (`/auth`, `/game`, `/user`, `/jwt`, `/provider`, etc.).
- Garantizan validaciones consistentes y seguras.

### ✅ Server

- `bootstrap.ts` es el punto de entrada unificado para inicializar cualquier microservicio de TrackPlay.
- Su función es preparar el entorno, cargar secretos, construir dependencias, configurar middlewares y levantar el servidor HTTP de forma tipada, consistente y extensible.
- Su propósito es proveer un flujo de arranque estándar para todos los servicios del ecosistema TrackPlay, garantizando que:
  - Las variables de entorno y secretos sean validados antes del inicio.
  - El logger e i18n estén listos para su uso global.
  - Las dependencias sigan una jerarquía hexagonal (`adapters → services → useCases → controllers`).
  - El servidor Express se configure con middlewares, rutas y manejadores comunes.
  - El arranque sea totalmente tipado y reutilizable entre servicios.

### ✅ Types

- Interfaces y tipos globales compartidos:
- `LoggerOptions`, `MiddlewareOptions`, `TranslationVariables`, etc.
- Generan tipos inferidos (`z.infer`) para un tipado compartido entre backend y frontend.
- Mantiene consistencia tipada entre microservicios y librerías.

### ✅ Utils

- Helpers reutilizables para tareas comunes:
  - `/fetch`: peticiones HTTP tipadas.
  - `/http`: utilidades de red.
  - `/validate`: validaciones y transformaciones genéricas.
  - `/translate`: helpers para traducciones y generación de paths (`getTranslationPath`, etc.).

---

## 🚀 Publicación de versiones

Siempre que se introduzcan mejoras o cambios relevantes en el paquete, es necesario seguir este flujo:

### 1. 📦 Incrementar la versión del paquete

Modifica el campo `version` en `package.json` siguiendo [semver](https://semver.org/lang/es/):

```json
{
  "name": "@trackplay/core",
  "version": "1.2.0"
}
```

### 2. 💾 Commit y push de los cambios

Asegúrate de guardar y subir los cambios a Git:

```bash
git add .
git commit -m "chore: bump version to 1.2.0"
git push origin develop
```

### 3. 🛠 Compilar y empaquetar el módulo

Ejecuta el build y genera el paquete comprimido:

```bash
pnpm run build
pnpm pack
```

Esto generará un archivo como: `trackplay-core-1.2.0.tgz`

### 4. 🚀 Publicar en el registry

Para publicar en el registro de NPM (por ejemplo, GitHub Packages), necesitas tener un archivo .npmrc configurado correctamente:

✅ .npmrc mínimo para GitHub Packages:

```ini
@YOUR_DIRECTORY:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

🔐 El authToken debe tener permisos de publicación (write:packages).

Luego publica con:

```bash
pnpm publish
```

### 5. 🔄 Actualizar dependencias en los demás repositorios

Una vez publicada la nueva versión, actualiza la dependencia en cada repositorio que consuma @trackplay/core:

```bash
ncu
ncu -u
pnpm install
```
