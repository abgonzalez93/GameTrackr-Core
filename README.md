# 🧩 @trackplay/core

**TrackPlay Core** es el paquete base que centraliza **toda la lógica, tipos y recursos compartidos** entre los distintos servicios y aplicaciones de la plataforma TrackPlay
(ej. `trackplay-auth`, `trackplay-catalog`, `trackplay-notifications`, `trackplay-frontend`, etc.).

Su objetivo es mantener el código **DRY**, **tipado**, **modular** y **consistente** en todos los entornos.

---

## 📦 Contenido

El paquete incluye:

### ✅ Clients

- Clientes reutilizables para servicios externos.
- Proveen una capa de abstracción sobre dependencias de terceros.
- Pensados para inyección de dependencias y testabilidad.

### ✅ Config

- `getEnv.config.ts`: valida y tipa las variables de entorno mediante Zod.
  - Soporte dual para entornos servidor/cliente.
  - Normaliza cadenas vacías a `undefined` para evitar errores silenciosos.
  - Expone tipos inferidos en tiempo de compilación (`z.infer`).
  - Controla exposición pública mediante prefijo (`NEXT_PUBLIC_`).
  - Lanza errores tipados en caso de archivos ausentes o vacíos.
- `getSecrets.config.ts`: gestiona la lectura segura de secretos desde `/run/secrets` o variables de entorno.
  - Lanza errores tipados en caso de archivos ausentes o vacíos.

### ✅ Constants

- Conjunto de valores fijos y enumeraciones: `HTTP_STATUS`, `JWT_CONFIG`, `GAME_CONSTANTS`, etc.
- Garantizan coherencia y evitan “magic numbers” o strings duplicados.

### ✅ Errors

- Sistema unificado de errores basado en clases tipadas y jerárquicas.
- Agrupados por dominio funcional:
  - `base` → `TrackPlayError`.
  - `http` → `BadRequestError`, `UnauthorizedError`, `ConflictError`, etc.
- Totalmente integrados con el sistema de traducciones (`i18next`).
- Compatibles con el middleware global de manejo de errores.
- `TrackPlayError` expone `statusCode`, `i18nKey`, `i18nArgs` y `details`.
- La propiedad `name` está pensada para mostrarse al cliente (por ejemplo en respuestas HTTP), y se formatea en una versión “legible” del nombre de la clase (ej. `ValidationError` → `Validation Error`).
- Para lógica de negocio, evita depender del string de `name`; usa `instanceof TrackPlayError`, `statusCode` o `i18nKey`.

### ✅ i18n

- Basado en `i18next` con soporte multilenguaje.
- Carga modular de traducciones desde cada módulo.

### ✅ Logger

- Wrapper de Winston con configuración estándar y coloreado por entorno.
- Soporta etiquetas de servicio (`label`), niveles (`debug`, `info`, `warn`, `error`) y salida formateada.
- Usado en la inicialización y en el flujo de errores global.
- Buffer Logger: Sistema de logs en memoria para la fase de arranque (`startup`).
  - Captura logs antes de que la configuración del entorno esté lista.
  - Permite volcar los logs acumulados a Winston (`flushToLogger`) una vez inicializado, o a la consola (`flushToConsole`) en caso de error fatal.
  - Soporta detección automática de colores TTY.

### ✅ Ports

- Interfaces contractuales que definen los límites entre dominio e infraestructura.
- Permiten sustituir adaptadores sin romper la lógica de negocio.

### ✅ Schemas (Zod)

- Esquemas de validación centralizados por dominio (`auth`, `game`, `user`, `jwt`, `provider`, etc.).
- Garantizan validaciones consistentes y seguras.

### ✅ Types

- Interfaces y tipos globales compartidos.
- Generan tipos inferidos (`z.infer`) para un tipado compartido entre backend y frontend.
- Mantiene consistencia tipada entre microservicios y librerías.

### ✅ Utils

- Helpers reutilizables para tareas comunes:
  - `fetch.util.ts`: peticiones HTTP tipadas.
  - `http.util.ts`: utilidades de red.
  - `translate.util.ts`: helpers para traducciones y generación de paths (`getTranslationPath`, etc.).
  - `validate.util.ts`: validaciones y transformaciones genéricas.

---

## 🚀 Publicación de versiones

Siempre que se introduzcan mejoras o cambios relevantes en el paquete, es necesario seguir este flujo:

### 1. 📦 Incrementar la versión del paquete

Modifica el campo `version` en `package.json` siguiendo [semver](https://semver.org/lang/es/):

```json
{
  "name": "@trackplay/core",
  "version": "x.y.z"
}
```

### 2. 💾 Commit y push de los cambios

Asegúrate de guardar y subir los cambios a Git:

```bash
git add .
git commit -m "chore: bump version to x.y.z"
git push origin develop
```

### 3. 🛠 Compilar y empaquetar el módulo

Ejecuta el build y genera el paquete comprimido:

```bash
pnpm run build
pnpm pack
```

Alternativa recomendada: usar el script de release del paquete:

```bash
pnpm run release
```

Esto generará un archivo como: `trackplay-core-x.y.z.tgz`

### 4. 🚀 Publicar en el registry

Para publicar en el registro de NPM (por ejemplo, GitHub Packages), necesitas tener un archivo .npmrc configurado correctamente:

✅ .npmrc mínimo para GitHub Packages:

```ini
@trackplay:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
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
