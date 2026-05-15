# Diccionario de Datos y Análisis de Módulos

Esta carpeta centraliza el modelo de datos unificado para todos los módulos del sistema (Dashboard, Usuarios, Instructores, Empresas, etc.).

## 📊 1. Módulo: Dashboard
El dashboard requiere indicadores clave que se calculan a partir de la base de datos centralizada. A continuación se detalla de dónde proviene cada métrica:

- **Total empresas:** Conteo total de registros en la tabla `empresas`.
- **Total carreras:** Conteo total de registros en la tabla `carreras`.
- **Total aprendices:** Conteo total de registros en la tabla `aprendices`.
- **Promedio avance:** Promedio del campo `avance_porcentaje` de todos los aprendices.
- **Progreso de carreras:** Agrupación y conteo por el campo `estado` de la tabla `carreras` (`activas`, `por validar`, `inactivas`).
- **Aprendices por ciclo:** Agrupación y conteo por el campo `ciclo` de la tabla `aprendices`.

---

## 👤 2. Módulo: Usuario (Autenticación y Perfiles)
La información principal de acceso se almacena en la tabla `usuarios`. Si el usuario es un aprendiz, un instructor o un representante de empresa, se vinculará a través de claves foráneas.

**Campos principales (`usuarios`):**
- `id`: Identificador único (Primary Key).
- `nombres`: Nombres del usuario.
- `apellidos`: Apellidos del usuario.
- `numero`: Número de contacto / celular.
- `email`: Correo electrónico (único, se usa para el login).
- `password`: Contraseña encriptada (Hash).
- `rol_id`: (Opcional pero recomendado) Para saber si es Administrador, Instructor, Aprendiz, etc.

---

## 🔐 3. Módulo: Verificación / Recuperación de Contraseña
Para manejar el registro seguro y la recuperación de credenciales, se usa la tabla `verify_codes`.

**Campos principales (`verify_codes`):**
- `id`: Identificador único.
- `codigo`: Código numérico o alfanumérico generado (ej. 6 dígitos).
- `email_usuario`: Correo electrónico al que se asocia el código.
- `fecha_expiracion`: Fecha y hora máxima para utilizar el código.
- `usado`: Booleano para saber si el código ya fue canjeado.

---

## 🎓 4. Otros Módulos Implícitos (Aprendices, Carreras, Empresas)

Para soportar los indicadores del Dashboard, la base de datos cuenta con tablas complementarias:

### `aprendices`
Almacena el perfil académico del estudiante.
- `usuario_id`: Relación 1 a 1 con la tabla de `usuarios`.
- `carrera_id`: Relación con la carrera que cursa.
- `ciclo`: Ciclo actual (1 al 6).
- `avance_porcentaje`: Valor de 0 a 100 indicando su avance en la carrera.

### `carreras`
- `id`: Identificador único.
- `nombre`: Nombre de la especialidad.
- `estado`: `activa`, `por validar`, `inactiva`.

### `empresas`
- `id`: Identificador único.
- `razon_social` / `nombre_comercial`.
- `ruc`: Identificador tributario (único).
- Datos de contacto.

> **Nota:** Revisa el archivo `schema.sql` para ver la implementación en código SQL de esta estructura, incluyendo las consultas exactas para el Dashboard.
