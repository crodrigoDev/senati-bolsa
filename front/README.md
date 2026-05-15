# Frontend - SENATI Bolsa

Este directorio (`front/`) contiene todo el código de la aplicación cliente (frontend) construida con React / Next.js.

---

## 🚀 Instalación y Ejecución

**¡Atención!** Se recomienda fuertemente utilizar `pnpm` para la gestión e instalación de dependencias en lugar de `npm`. Recientemente el registro de npm ha sufrido vulnerabilidades de seguridad (malware inyectado en paquetes), por lo que el uso de `pnpm` es una alternativa mucho más segura, rápida y eficiente en almacenamiento.

### Requisitos Previos

Si aún no tienes `pnpm` instalado en tu sistema, instálalo globalmente. Puedes hacerlo ejecutando (usando tu manejador preferido, si usas npm por defecto):

```bash
npm install -g pnpm
```
O usando Corepack (incluido en Node.js modernos):
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

### 1. Instalar las Dependencias

Abre tu terminal dentro de esta carpeta (`front/`) e instala las dependencias del proyecto usando `pnpm`:

```bash
pnpm install
```
*(No utilices `npm install`)*

### 2. Ejecutar Entorno de Desarrollo

Una vez instaladas las dependencias, levanta el servidor local de desarrollo con:

```bash
pnpm run dev
```

El servidor iniciará y podrás visualizar la aplicación en tu navegador accediendo a: **[http://localhost:3000](http://localhost:3000)**.
