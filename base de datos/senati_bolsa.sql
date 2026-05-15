DROP DATABASE IF EXISTS senati_bolsa;
CREATE DATABASE senati_bolsa;
USE senati_bolsa;

-- Tabla de Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla de Códigos de Verificación
CREATE TABLE verify_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(6) NOT NULL,
    email_usuario VARCHAR(150) NOT NULL,
    fecha_expiracion DATETIME NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Empresas
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    nombre_comercial VARCHAR(150),
    ruc VARCHAR(11) UNIQUE NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    email_contacto VARCHAR(150),
    estado ENUM('activa', 'inactiva') DEFAULT 'activa',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Carreras
CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    estado ENUM('activa', 'por validar', 'inactiva') DEFAULT 'por validar',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Aprendices
CREATE TABLE aprendices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    carrera_id INT,
    ciclo INT NOT NULL CHECK (ciclo >= 1 AND ciclo <= 6),
    avance_porcentaje DECIMAL(5,2) DEFAULT 0.00 CHECK (avance_porcentaje >= 0 AND avance_porcentaje <= 100),
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE SET NULL
);

-- ==========================================
-- PROCEDIMIENTOS ALMACENADOS
-- ==========================================
DELIMITER //

-- ------------------------------------------
-- MÓDULO: USUARIOS / PERFIL
-- ------------------------------------------

CREATE PROCEDURE SP_ObtenerUsuarioPorEmail(
    IN p_email VARCHAR(150)
)
BEGIN
    SELECT * FROM usuarios WHERE email = p_email AND activo = TRUE;
END //

CREATE PROCEDURE SP_ObtenerUsuarioPorId(
    IN p_id INT
)
BEGIN
    SELECT * FROM usuarios WHERE id = p_id;
END //

-- Editar Perfil
CREATE PROCEDURE SP_ActualizarPerfil(
    IN p_id INT,
    IN p_nombres VARCHAR(100),
    IN p_apellidos VARCHAR(100),
    IN p_numero VARCHAR(20)
)
BEGIN
    UPDATE usuarios 
    SET nombres = p_nombres, 
        apellidos = p_apellidos, 
        numero = p_numero 
    WHERE id = p_id;
END //

-- Editar Contraseña
CREATE PROCEDURE SP_ActualizarPassword(
    IN p_id INT,
    IN p_password VARCHAR(255)
)
BEGIN
    UPDATE usuarios SET password = p_password WHERE id = p_id;
END //

-- ------------------------------------------
-- MÓDULO: CÓDIGOS DE VERIFICACIÓN
-- ------------------------------------------
CREATE PROCEDURE SP_CrearCodigoVerificacion(
    IN p_codigo VARCHAR(6),
    IN p_email VARCHAR(150),
    IN p_minutos_expiracion INT
)
BEGIN
    INSERT INTO verify_codes (codigo, email_usuario, fecha_expiracion)
    VALUES (p_codigo, p_email, DATE_ADD(NOW(), INTERVAL p_minutos_expiracion MINUTE));
END //

CREATE PROCEDURE SP_ValidarCodigo(
    IN p_codigo VARCHAR(6),
    IN p_email VARCHAR(150)
)
BEGIN
    SELECT * 
    FROM verify_codes 
    WHERE codigo = p_codigo 
      AND email_usuario = p_email 
      AND usado = FALSE 
      AND fecha_expiracion > NOW()
    ORDER BY id DESC LIMIT 1;
END //

CREATE PROCEDURE SP_MarcarCodigoUsado(
    IN p_id INT
)
BEGIN
    UPDATE verify_codes SET usado = TRUE WHERE id = p_id;
END //

-- ------------------------------------------
-- MÓDULO: EMPRESAS
-- ------------------------------------------
CREATE PROCEDURE SP_CrearEmpresa(
    IN p_razon_social VARCHAR(150),
    IN p_nombre_comercial VARCHAR(150),
    IN p_ruc VARCHAR(11),
    IN p_direccion TEXT,
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(150)
)
BEGIN
    INSERT INTO empresas (razon_social, nombre_comercial, ruc, direccion, telefono, email_contacto)
    VALUES (p_razon_social, p_nombre_comercial, p_ruc, p_direccion, p_telefono, p_email);
END //

CREATE PROCEDURE SP_ObtenerEmpresa(
    IN p_id INT
)
BEGIN
    SELECT * FROM empresas WHERE id = p_id;
END //

CREATE PROCEDURE SP_ListarEmpresas()
BEGIN
    SELECT * FROM empresas ORDER BY fecha_registro DESC;
END //

CREATE PROCEDURE SP_ActualizarEmpresa(
    IN p_id INT,
    IN p_razon_social VARCHAR(150),
    IN p_nombre_comercial VARCHAR(150),
    IN p_ruc VARCHAR(11),
    IN p_direccion TEXT,
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(150)
)
BEGIN
    UPDATE empresas 
    SET razon_social = p_razon_social,
        nombre_comercial = p_nombre_comercial,
        ruc = p_ruc,
        direccion = p_direccion,
        telefono = p_telefono,
        email_contacto = p_email
    WHERE id = p_id;
END //

CREATE PROCEDURE SP_CambiarEstadoEmpresa(
    IN p_id INT,
    IN p_estado ENUM('activa', 'inactiva')
)
BEGIN
    UPDATE empresas SET estado = p_estado WHERE id = p_id;
END //

-- ------------------------------------------
-- MÓDULO: CARRERAS
-- ------------------------------------------
CREATE PROCEDURE SP_CrearCarrera(
    IN p_nombre VARCHAR(150)
)
BEGIN
    INSERT INTO carreras (nombre) VALUES (p_nombre);
END //

CREATE PROCEDURE SP_ObtenerCarrera(
    IN p_id INT
)
BEGIN
    SELECT * FROM carreras WHERE id = p_id;
END //

CREATE PROCEDURE SP_ListarCarreras()
BEGIN
    SELECT * FROM carreras;
END //

CREATE PROCEDURE SP_ActualizarCarrera(
    IN p_id INT,
    IN p_nombre VARCHAR(150)
)
BEGIN
    UPDATE carreras SET nombre = p_nombre WHERE id = p_id;
END //

CREATE PROCEDURE SP_CambiarEstadoCarrera(
    IN p_id INT,
    IN p_estado ENUM('activa', 'por validar', 'inactiva')
)
BEGIN
    UPDATE carreras SET estado = p_estado WHERE id = p_id;
END //

-- ------------------------------------------
-- MÓDULO: APRENDICES
-- ------------------------------------------
CREATE PROCEDURE SP_CrearAprendiz(
    IN p_usuario_id INT,
    IN p_carrera_id INT,
    IN p_ciclo INT
)
BEGIN
    INSERT INTO aprendices (usuario_id, carrera_id, ciclo)
    VALUES (p_usuario_id, p_carrera_id, p_ciclo);
END //

CREATE PROCEDURE SP_ObtenerAprendiz(
    IN p_id INT
)
BEGIN
    SELECT a.*, u.nombres, u.apellidos, u.email, c.nombre AS carrera_nombre 
    FROM aprendices a
    JOIN usuarios u ON a.usuario_id = u.id
    LEFT JOIN carreras c ON a.carrera_id = c.id
    WHERE a.id = p_id;
END //

CREATE PROCEDURE SP_ListarAprendices()
BEGIN
    SELECT a.*, u.nombres, u.apellidos, u.email, c.nombre AS carrera_nombre 
    FROM aprendices a
    JOIN usuarios u ON a.usuario_id = u.id
    LEFT JOIN carreras c ON a.carrera_id = c.id;
END //

CREATE PROCEDURE SP_ActualizarAprendiz(
    IN p_id INT,
    IN p_carrera_id INT,
    IN p_ciclo INT
)
BEGIN
    UPDATE aprendices 
    SET carrera_id = p_carrera_id,
        ciclo = p_ciclo
    WHERE id = p_id;
END //

CREATE PROCEDURE SP_ActualizarAvanceAprendiz(
    IN p_id INT,
    IN p_avance DECIMAL(5,2)
)
BEGIN
    UPDATE aprendices SET avance_porcentaje = p_avance WHERE id = p_id;
END //

CREATE PROCEDURE SP_EliminarAprendiz(
    IN p_id INT
)
BEGIN
    DELETE FROM aprendices WHERE id = p_id;
END //

-- ------------------------------------------
-- MÓDULO: DASHBOARD
-- ------------------------------------------
CREATE PROCEDURE SP_ObtenerEstadisticasDashboard()
BEGIN
    SELECT COUNT(*) AS total_empresas FROM empresas;
    SELECT COUNT(*) AS total_carreras FROM carreras;
    SELECT COUNT(*) AS total_aprendices FROM aprendices;
    SELECT IFNULL(ROUND(AVG(avance_porcentaje), 2), 0) AS promedio_avance FROM aprendices;
    SELECT estado, COUNT(*) AS cantidad FROM carreras GROUP BY estado;
    SELECT ciclo, COUNT(*) AS cantidad FROM aprendices GROUP BY ciclo ORDER BY ciclo;
END //

DELIMITER ;
