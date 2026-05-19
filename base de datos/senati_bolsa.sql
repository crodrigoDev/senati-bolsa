DROP DATABASE IF EXISTS senati_bolsa;
CREATE DATABASE senati_bolsa;
USE senati_bolsa;

-- Creacion de las tablas

-- Tabla de Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO',  -- nuevo (ACTIVO, INACTIVO, BLOQUEADO)
    password VARCHAR(255) NOT NULL,     
    rol_id INT NOT NULL,                 
    foto_url MEDIUMTEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- tabla de codigos de verificacion
CREATE TABLE verify_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(6) NOT NULL,
    usuario_id INT NOT NULL,            -- ahora con id de usuario, antes con email
    estado VARCHAR(20) DEFAULT 'DISPONIBLE', -- ahora en varchar para funcion con enum en spring (DISPONIBLE, USADO, EXPIRADO)
    fecha_expiracion DATETIME NOT NULL,  
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE 
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
    descripcion TEXT,
    estado ENUM('activa', 'por validar', 'inactiva') DEFAULT 'por validar',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Instructores
CREATE TABLE instructores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    carrera_id INT,
    dni VARCHAR(8) UNIQUE,
    correo_personal VARCHAR(150),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE SET NULL
);

-- Procedimientos almacenados

DELIMITER //

-- 1. USUARIOS / PERFIL
CREATE PROCEDURE SP_ObtenerUsuarioPorEmail(IN p_email VARCHAR(150))
BEGIN
    SELECT * FROM usuarios WHERE email = p_email;
END //

CREATE PROCEDURE SP_ObtenerUsuarioPorId(IN p_id INT)
BEGIN
    SELECT * FROM usuarios WHERE id = p_id;
END //

CREATE PROCEDURE SP_ObtenerPerfilPorId(IN p_id INT)
BEGIN
    SELECT u.*, i.dni, i.correo_personal, i.carrera_id
    FROM usuarios u
    LEFT JOIN instructores i ON i.usuario_id = u.id
    WHERE u.id = p_id;
END //

CREATE PROCEDURE SP_ActualizarPerfil(
    IN p_id INT,
    IN p_nombres VARCHAR(100),
    IN p_apellidos VARCHAR(100),
    IN p_numero VARCHAR(20),
    IN p_foto_url MEDIUMTEXT
)
BEGIN
    UPDATE usuarios 
    SET nombres = p_nombres, apellidos = p_apellidos, numero = p_numero, foto_url = p_foto_url
    WHERE id = p_id;
END //

CREATE PROCEDURE SP_ActualizarPassword(IN p_id INT, IN p_password VARCHAR(255))
BEGIN
    UPDATE usuarios SET password = p_password WHERE id = p_id;
END //

-- 2. CÓDIGOS DE VERIFICACIÓN
CREATE PROCEDURE SP_CrearCodigoVerificacion(IN p_codigo VARCHAR(6), IN p_email VARCHAR(150), IN p_minutos_expiracion INT)
BEGIN
    INSERT INTO verify_codes (codigo, email_usuario, fecha_expiracion)
    VALUES (p_codigo, p_email, DATE_ADD(NOW(), INTERVAL p_minutos_expiracion MINUTE));
END //

-- 3. EMPRESAS
CREATE PROCEDURE SP_ListarEmpresas()
BEGIN
    SELECT * FROM empresas ORDER BY fecha_registro DESC;
END //

-- 4. CARRERAS
CREATE PROCEDURE SP_ListarCarreras()
BEGIN
    SELECT * FROM carreras;
END //

-- 5. INSTRUCTORES
CREATE PROCEDURE SP_RegistrarInstructorCompleto(
    IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_telefono VARCHAR(20),
    IN p_email_institucional VARCHAR(150), IN p_password VARCHAR(255), IN p_rol_id INT,
    IN p_carrera_id INT, IN p_dni VARCHAR(8), IN p_correo_personal VARCHAR(150)
)
BEGIN
    DECLARE v_usuario_id INT;
    INSERT INTO usuarios (nombres, apellidos, numero, email, password, rol_id)
    VALUES (p_nombres, p_apellidos, p_telefono, p_email_institucional, p_password, p_rol_id);
    SET v_usuario_id = LAST_INSERT_ID();
    INSERT INTO instructores (usuario_id, carrera_id, dni, correo_personal)
    VALUES (v_usuario_id, p_carrera_id, p_dni, p_correo_personal);
END //

CREATE PROCEDURE SP_ListarInstructores()
BEGIN
    SELECT i.*, u.nombres, u.apellidos, u.email AS correo_institucional, u.numero AS telefono, u.foto_url, c.nombre AS carrera_nombre 
    FROM instructores i JOIN usuarios u ON i.usuario_id = u.id LEFT JOIN carreras c ON i.carrera_id = c.id;
END //

-- 6. DASHBOARD
CREATE PROCEDURE SP_ObtenerEstadisticasDashboard()
BEGIN
    SELECT COUNT(*) AS total_empresas FROM empresas;
    SELECT COUNT(*) AS total_carreras FROM carreras;
    SELECT COUNT(*) AS total_instructores FROM instructores;
    SELECT estado, COUNT(*) AS cantidad FROM carreras GROUP BY estado;
END //

DELIMITER ;

-- Datos de prueba

-- Roles
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Instructor'), ('Empresa');

-- Carreras
INSERT INTO carreras (nombre, descripcion, estado) VALUES 
('Ingeniería de Software con IA', 'Desarrollo moderno y Machine Learning', 'activa'),
('Diseño Gráfico', 'Comunicación visual y multimedia', 'activa'),
('Mecatrónica Industrial', 'Robótica y procesos automáticos', 'activa');

-- Empresas
INSERT INTO empresas (razon_social, nombre_comercial, ruc, direccion, telefono, email_contacto) VALUES 
('Google Peru S.A.', 'Google', '20123456789', 'Calle Las Orquideas 123, San Isidro', '01-444-5555', 'rrhh@google.com'),
('Sodimac S.A.', 'Sodimac', '20987654321', 'Av. Javier Prado 456, Lima', '01-222-3333', 'talento@sodimac.com');

-- Usuarios (ID 1 para el perfil del demo)
INSERT INTO usuarios (id, nombres, apellidos, numero, email, password, foto_url, rol_id) VALUES 
(1, 'Juan Roberto', 'Rivera Mendoza', '987654321', 'juan_32@senati.pe', '123456', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 2);

-- Instructores
INSERT INTO instructores (usuario_id, carrera_id, dni, correo_personal) VALUES 
(1, 1, '72841526', 'juan.rivera@gmail.com');
