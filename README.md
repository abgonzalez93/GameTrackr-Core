# 🧩 @trackplay/core

Este paquete contiene la lógica y recursos compartidos entre los distintos servicios de la plataforma **TrackPlay** (backend, frontend y microservicios como Auth, IGDB, Notifications...).

Su propósito es **centralizar, estandarizar y mantener DRY** todo aquello que se usa de forma común en la aplicación.

---

## 📦 Contenido

El paquete incluye:

### ✅ Clientes Externos

- Conjunto de clientes reutilizables para integraciones externas como por ejemplo: cliente Redis (/clients/redis).
- Diseñado para ampliarse fácilmente con nuevos conectores (e.g., Kafka, HTTP, S3...).

### ✅ Constantes

- Enumeraciones y constantes reutilizables:
- httpStatus, jwt, game, etc.
- Mantiene la coherencia de nombres y valores a lo largo de la aplicación.

### ✅ Errores

- Clases de error tipadas y jerarquizadas (TrackPlayError, HttpErrors, etc.).
- Códigos y mensajes de error estandarizados por servicio.
- Integración con i18n para mensajes traducibles.

### ✅ Sistema de Traducciones

- Basado en i18next con soporte multilenguaje.
- Carga dinámica de locales desde /locales.
- Interpolación ({{variable}}) y fallbacks configurables.
- Permite respuestas localizadas según idioma del cliente.

### ✅ Logger

- Logger preconfigurado con colores y niveles.
- Basado en consola y fácilmente extensible.
- Ideal para unificar logs en todos los servicios.

### ✅ Middlewares

- Middlewares genéricos para Express:
  - applyMiddlewares: aplicación masiva de middlewares.
  - createErrorHandler: gestión centralizada de errores.
  - createNotFoundHandler: control de rutas inexistentes.
- Preparados para usarse en cualquier microservicio backend.

### ✅ Puertos

- Interfaces contractuales (Ports) que definen la comunicación entre capas del dominio como: ProviderTokenPort, GamePort, CategoryPort, etc.
- Garantizan independencia entre dominio e infraestructura.

### ✅ Schemas y Tipados

- Validaciones Zod centralizadas para todas las entidades del dominio (User, Game, Category, Auth, TrackGame, etc.).
- Tipos inferidos reutilizables entre frontend, backend y microservicios.
- Estructura modular por dominio (/auth, /game, /user, /jwt, /login, /providers, /shared…).

### ✅ Servidor

- Configuración base para bootstrap de servicios.
- Mecanismos comunes de inicialización y carga interna (/internal, bootstrap.ts).

### ✅ Utilidades

- Helpers reutilizables para tareas comunes:
  - /fetch: peticiones HTTP tipadas.
  - /net: utilidades de red.
  - /parse: validaciones y transformaciones genéricas.
  - /translate: helpers para traducciones y generación de paths (getTranslationPath, etc.).
- Funciones globales como validateSchema, toPublicUser, etc.

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
@trackplay:registry=https://npm.pkg.github.com
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
