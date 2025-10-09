# 🧩 @trackplay/core

**TrackPlay Core** es el paquete base que centraliza **toda la lógica, tipos y recursos compartidos** entre los distintos servicios y aplicaciones de la plataforma TrackPlay
(ej. `trackplay-auth`, `trackplay-catalog`, `trackplay-notifications`, `trackplay-frontend`, etc.).

Su objetivo es mantener el código **DRY**, **tipado**, **modular** y **consistente** en todos los entornos.

---

## 📦 Contenido

El paquete incluye:

### ✅ Clientes externos

- Clientes reutilizables para servicios externos (ej. `createRedis`).
- Proveen una capa de abstracción sobre dependencias de terceros.
- Pensados para inyección de dependencias y testabilidad.

### ✅ Configuración de entorno

- Validación automática con `Zod`
- Soporte dual para entornos de servidor y cliente.
- Prevención de errores silenciosos: las cadenas vacías se tratan como `undefined`.
- Tipado inferido en tiempo de compilación `z.infer`.
- Control de exposición en entorno cliente mediante prefijo configurable `NEXT_PUBLIC_`.

### ✅ Constantes

- Conjunto de valores fijos y enumeraciones: `HTTP_STATUS`, `JWT_CONFIG`, `GAME_CONSTANTS`, etc.
- Garantizan coherencia y evitan “magic numbers” o strings duplicados.

### ✅ Errores

- Sistema unificado de errores basado en clases tipadas.
- Soporte para i18n y traducciones dinámicas (`TrackPlayError`, `BadRequestError`, etc.).
- Compatible con middleware global de manejo de errores.

### ✅ Sistema de traducciones

- Basado en i18next con soporte multilenguaje.
- Carga modular de traducciones desde cada módulo.
- Funciones auxiliares (`getTranslationPath`, `initI18n`, etc.) para integración automática.

### ✅ Logger

- Wrapper de Winston con configuración estándar y coloreado por entorno.
- Integración con etiquetas de servicio (`label`) y niveles (`info`, `error`, `debug`).
- Utilizado globalmente en el arranque de cada microservicio.

### ✅ Middlewares

- Middlewares genéricos para Express:
  - `applyMiddlewares`: aplicación masiva de middlewares.
  - `createErrorHandler`: gestión centralizada de errores.
  - `createNotFoundHandler`: control de rutas inexistentes.
- Configurables mediante opciones (`MiddlewareOptions`).

### ✅ Puertos

- Interfaces contractuales que definen los límites entre dominio e infraestructura.
- Permiten sustituir adaptadores sin romper la lógica de negocio.

### ✅ Schemas Zod

- Esquemas de validación centralizados por dominio (`/auth`, `/game`, `/user`, `/jwt`, `/provider`, etc.).
- Garantizan validaciones consistentes y seguras.

### ✅ Servidor

- Sistema de bootstrap común para inicializar servicios TrackPlay.
- Incluye configuración de middlewares, logger, i18n y contexto base (`InfrastructureContext`).
- Permite extender el arranque con hooks (`onBeforeApp`) o configuraciones específicas.

### ✅ Tipos

- Interfaces y tipos globales compartidos:
- `LoggerOptions`, `MiddlewareOptions`, `TranslationVariables`, etc.
- Generan tipos inferidos (`z.infer`) para un tipado compartido entre backend y frontend.
- Mantiene consistencia tipada entre microservicios y librerías.

### ✅ Utilidades

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
