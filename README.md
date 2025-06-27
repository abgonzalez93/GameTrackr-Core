# 🧩 @trackplay/core

Este paquete contiene la lógica y recursos compartidos entre los distintos servicios de la plataforma **TrackPlay** (backend, frontend y microservicios como Auth, IGDB, Notifications...).

Su propósito es **centralizar, estandarizar y mantener DRY** todo aquello que se usa de forma común en la aplicación.

---

## 📦 Contenido

El paquete incluye:

### ✅ Schemas y Tipados

- Validaciones Zod compartidas para entidades como `User`, `Game`, `Token`, etc.
- Tipos inferidos reutilizables entre frontend y backend.

### ✅ Utilidades

- Funciones genéricas (`parseOrThrow`, `toPublicUser`, etc.)
- Utilidades de hashing, validación, formateo, etc.

### ✅ Errores

- Clases de error tipadas y personalizadas (`NotFoundError`, `UnauthorizedError`, `ConflictError`...).

### ✅ Middlewares

- Middlewares reutilizables para Express (como validación de JWT, cabeceras, etc.).

### ✅ Logger

- Logger preconfigurado para todos los servicios (basado en consola y coloreado).

### ✅ Cliente Redis

- Cliente Redis reutilizable e inicializable dinámicamente.
- Útil para features como blacklist de tokens o envío de notificaciones.

### ✅ Sistema de Traducciones (i18n)

- Traductor centralizado con `i18next`.
- Soporte multilenguaje con interpolación (`{{variable}}`) y fallbacks.
- Permite a los servicios responder en el idioma del cliente (por ejemplo, según `Accept-Language`).

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
npm run build
npm pack
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
npm publish
```

### 5. 🔄 Actualizar dependencias en los demás repositorios

Una vez publicada la nueva versión, actualiza la dependencia en cada repositorio que consuma @trackplay/core:

```bash
ncu
ncu -u
npm install
```
