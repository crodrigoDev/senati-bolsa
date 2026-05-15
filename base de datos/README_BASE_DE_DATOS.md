# Base de Datos SENATI Bolsa

Este documento centraliza el modelo de datos unificado para todos los módulos del sistema (Dashboard, Usuarios, Instructores, Empresas, etc.). La base de datos está diseñada en **MySQL** e incluye Procedimientos Almacenados para todas sus operaciones.

## 📊 1. Módulo: Dashboard
El dashboard requiere indicadores clave que se calculan a través del procedimiento almacenado `SP_ObtenerEstadisticasDashboard`. Las métricas son:
- **Total empresas:** Conteo total de registros en la tabla `empresas`.
- **Total carreras:** Conteo total de registros en la tabla `carreras`.
- **Total aprendices:** Conteo total de registros en la tabla `aprendices`.
- **Promedio avance:** Promedio del campo `avance_porcentaje` de todos los aprendices.
- **Progreso de carreras:** Agrupación y conteo por el campo `estado` de la tabla `carreras` (`activas`, `por validar`, `inactivas`).
- **Aprendices por ciclo:** Agrupación y conteo por el campo `ciclo` de la tabla `aprendices`.

## 👤 2. Módulo: Usuario (Perfil Institucional)
La información principal de acceso se almacena en la tabla `usuarios`. **Importante:** Al ser un sistema institucional, los usuarios NO se crean directamente desde la aplicación, por lo que no existen funciones de registro público. Ya deben existir previamente en la base de datos.
- **Campos principales:** `id`, `nombres`, `apellidos`, `numero`, `email`, `password`, `rol_id`, `activo` (Boolean), `fecha_creacion`.
- **Procedimientos principales:**
  - `SP_ObtenerUsuarioPorEmail` y `SP_ObtenerUsuarioPorId`: Para validación de sesión y carga de datos.
  - `SP_ActualizarPerfil`: Para editar los datos personales permitidos.
  - `SP_ActualizarPassword`: Para el cambio exclusivo de contraseña.

## 🔐 3. Módulo: Verificación (Códigos OTP)
Para la seguridad de la recuperación de contraseñas, se usa la tabla independiente `verify_codes`.
- **Campos principales:** `id`, `codigo`, `email_usuario`, `fecha_expiracion`, `usado`, `fecha_creacion`.
- **Procedimientos principales:** `SP_CrearCodigoVerificacion`, `SP_ValidarCodigo`, `SP_MarcarCodigoUsado`.

## 🏢 4. Módulo: Empresas
- **Campos principales:** `id`, `razon_social`, `nombre_comercial`, `ruc`, `direccion`, `telefono`, `email_contacto`, `estado` ('activa', 'inactiva').
- **Procedimientos principales:** `SP_CrearEmpresa`, `SP_ListarEmpresas`, `SP_ObtenerEmpresa`, `SP_ActualizarEmpresa`, `SP_CambiarEstadoEmpresa`.

## 🎓 5. Módulo: Carreras
- **Campos principales:** `id`, `nombre`, `estado` ('activa', 'por validar', 'inactiva').
- **Procedimientos principales:** `SP_CrearCarrera`, `SP_ListarCarreras`, `SP_ObtenerCarrera`, `SP_ActualizarCarrera`, `SP_CambiarEstadoCarrera`.

## 👨‍🎓 6. Módulo: Aprendices
Almacena el perfil académico del estudiante y lo enlaza a su cuenta de usuario y carrera.
- **Campos principales:** `id`, `usuario_id`, `carrera_id`, `ciclo` (1-6), `avance_porcentaje` (0-100).
- **Procedimientos principales:** `SP_CrearAprendiz`, `SP_ListarAprendices`, `SP_ObtenerAprendiz`, `SP_ActualizarAprendiz`, `SP_ActualizarAvanceAprendiz`, `SP_EliminarAprendiz`.

---

> **Nota para el Equipo de Desarrollo:** Revisa la base de datos para poder hacer correcciones en caso sea tu caso según tu módulo, ya que trabajaremos en equipo. Toda la lógica de negocio y las consultas se manejan mediante sus respectivos procedimientos almacenados ya establecidos en el archivo `.sql`.
