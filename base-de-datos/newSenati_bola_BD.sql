DROP DATABASE IF EXISTS senati_bolsa;
CREATE DATABASE senati_bolsa;
USE senati_bolsa;

-- ====================================================================
-- CREACIÓN DE TABLAS
-- ====================================================================

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    foto_url MEDIUMTEXT,
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE verify_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(6) NOT NULL,
    email_usuario VARCHAR(150) NOT NULL,
    fecha_expiracion DATETIME NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    estado ENUM('activa', 'por validar', 'inactiva') DEFAULT 'por validar',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instructores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    carrera_id INT,
    dni CHAR(8) NOT NULL,
    correo_personal CHAR(70),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comercial VARCHAR(150) NOT NULL,
    ruc VARCHAR(11) NOT NULL,
    gmail_contacto VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    estado ENUM('activa', 'por validar', 'inactiva', 'suspendida') DEFAULT 'por validar',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE aprendices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    carrera_id INT,
    correo_institucional VARCHAR(100) NOT NULL,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);

CREATE TABLE empresa_aprendices (
    id_estudiante INT,
    id_empresa INT,
    fecha_convenio DATETIME NOT NULL,
    duracion VARCHAR(50),
    PRIMARY KEY (id_estudiante, id_empresa),
    FOREIGN KEY (id_estudiante) REFERENCES aprendices(id),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);

CREATE TABLE empresa_monitor (
    id_Monitor INT,
    id_empresa INT,
    PRIMARY KEY (id_Monitor, id_empresa),
    FOREIGN KEY (id_Monitor) REFERENCES instructores(id),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);


-- ====================================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ====================================================================

DELIMITER //

CREATE PROCEDURE sp_listar_instructores()
BEGIN
    SELECT * FROM instructores;
END //

CREATE PROCEDURE sp_buscar_instructor(IN p_id INT)
BEGIN
    SELECT * FROM instructores WHERE id = p_id;
END //

CREATE PROCEDURE sp_crear_instructor(
    IN p_nombres              VARCHAR(100),
    IN p_apellido_paterno     VARCHAR(50),
    IN p_apellido_materno     VARCHAR(50),
    IN p_correo_institucional VARCHAR(100),
    IN p_correo_personal      VARCHAR(100),
    IN p_telefono             VARCHAR(15),
    IN p_dni                  VARCHAR(8)
)
BEGIN
    INSERT INTO instructores (dni, correo_personal) VALUES (p_dni, p_correo_personal);
END //

CREATE PROCEDURE SP_CrearCodigoVerificacion(IN p_codigo VARCHAR(6), IN p_email VARCHAR(150), IN p_minutos_expiracion INT)
BEGIN
    INSERT INTO verify_codes (codigo, email_usuario, fecha_expiracion)
    VALUES (p_codigo, p_email, DATE_ADD(NOW(), INTERVAL p_minutos_expiracion MINUTE));
END //

CREATE PROCEDURE SP_ListarEmpresas()
BEGIN
    SELECT * FROM empresas ORDER BY fecha_registro DESC;
END //

CREATE PROCEDURE sp_obtener_contacto_empresa(IN p_empresa_id INT)
BEGIN
    SELECT 
        e.id AS empresa_id,
        e.nombre_comercial AS empresa_nombre,
        e.ruc AS empresa_ruc,
        e.estado AS empresa_estado,
        e.telefono AS empresa_telefono,
        e.gmail_contacto AS empresa_correo,
        e.direccion AS empresa_direccion,
        IF(u.id IS NOT NULL, CONCAT(u.nombres, ' ', u.apellidos), NULL) AS monitor_assigned
    FROM empresas e
    LEFT JOIN empresa_monitor em ON e.id = em.id_empresa
    LEFT JOIN instructores i ON em.id_Monitor = i.id
    LEFT JOIN usuarios u ON i.usuario_id = u.id
    WHERE e.id = p_empresa_id;
END //

CREATE PROCEDURE sp_obtener_distribucion_aprendices(IN p_empresa_id INT)
BEGIN
    DECLARE t_total_aprendices INT DEFAULT 0;
    
    SELECT COUNT(*) INTO t_total_aprendices
    FROM empresa_aprendices
    WHERE id_empresa = p_empresa_id;

    SELECT 
        c.nombre AS carrera_nombre,
        COUNT(ea.id_estudiante) AS cantidad,
        IF(t_total_aprendices > 0, ROUND((COUNT(ea.id_estudiante) * 100.0) / t_total_aprendices, 2), 0) AS porcentaje
    FROM carreras c
    INNER JOIN aprendices a ON c.id = a.carrera_id
    INNER JOIN empresa_aprendices ea ON a.id = ea.id_estudiante
    WHERE ea.id_empresa = p_empresa_id
    GROUP BY c.id, c.nombre
    ORDER BY cantidad DESC;
END //

CREATE PROCEDURE sp_listar_cards_empresas()
BEGIN
    SELECT 
        e.id AS empresa_id,
        e.nombre_comercial AS empresa_nombre,
        e.ruc AS empresa_ruc,
        e.telefono AS empresa_telefono,
        e.estado AS empresa_estado,
        COALESCE(CONCAT(u.nombres, ' ', u.apellidos), 'Ningún monitor asignado') AS monitor_nombre,
        (SELECT COUNT(*) FROM empresa_aprendices ea WHERE ea.id_empresa = e.id) AS total_aprendices
    FROM empresas e
    LEFT JOIN empresa_monitor em ON e.id = em.id_empresa
    LEFT JOIN instructores i ON em.id_Monitor = i.id
    LEFT JOIN usuarios u ON i.usuario_id = u.id
    ORDER BY e.nombre_comercial ASC;
END //

CREATE PROCEDURE sp_insertar_empresa(
    IN p_nombre VARCHAR(150),
    IN p_ruc VARCHAR(11),
    IN p_gmail VARCHAR(100),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(255),
    IN p_estado ENUM('activa', 'por validar', 'inactiva', 'suspendida')
)
BEGIN
    INSERT INTO empresas (nombre_comercial, ruc, gmail_contacto, telefono, direccion, estado)
    VALUES (p_nombre, p_ruc, p_gmail, p_telefono, p_direccion, p_estado);
    
    SELECT LAST_INSERT_ID() AS nuevo_empresa_id;
END //

CREATE PROCEDURE sp_actualizar_empresa(
    IN p_id INT,
    IN p_nombre VARCHAR(150),
    IN p_ruc VARCHAR(11),
    IN p_gmail VARCHAR(100),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(255),
    IN p_estado ENUM('activa', 'por validar', 'inactiva', 'suspendida')
)
BEGIN
    UPDATE empresas 
    SET nombre_comercial = p_nombre,
        ruc = p_ruc,
        gmail_contacto = p_gmail,
        telefono = p_telefono,
        direccion = p_direccion,
        estado = p_estado
    WHERE id = p_id;
END //

CREATE PROCEDURE sp_eliminar_empresa(
    IN p_id INT
)
BEGIN
    DELETE FROM empresa_aprendices WHERE id_empresa = p_id;
    DELETE FROM empresa_monitor WHERE id_empresa = p_id;
    DELETE FROM empresas WHERE id = p_id;
END //

CREATE PROCEDURE SP_ListarCarreras()
BEGIN
    SELECT * FROM carreras;
END //

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
    FROM instructores i 
    JOIN usuarios u ON i.usuario_id = u.id 
    LEFT JOIN carreras c ON i.carrera_id = c.id;
END //

CREATE PROCEDURE SP_ObtenerEstadisticasDashboard()
BEGIN
    SELECT COUNT(*) AS total_empresas FROM empresas;
    SELECT COUNT(*) AS total_carreras FROM carreras;
    SELECT COUNT(*) AS total_instructores FROM instructores;
    SELECT estado, COUNT(*) AS cantidad FROM carreras GROUP BY estado;
END //

DELIMITER ;


-- ====================================================================
-- DATA DE PRUEBA
-- ====================================================================

INSERT INTO roles (nombre) VALUES ('Administrador'), ('Instructor'), ('Empresa');

INSERT INTO carreras (nombre, descripcion, estado) VALUES 
('Ingeniería de Software con IA', 'Desarrollo moderno y Machine Learning', 'activa'),
('Diseño Gráfico', 'Comunicación visual y multimedia', 'activa'),
('Mecatrónica Industrial', 'Robótica y procesos automáticos', 'activa');

INSERT INTO empresas (nombre_comercial, ruc, gmail_contacto, telefono, direccion, estado) VALUES
('ProgramIt S.A.C.', '20567890123', 'contacto@programit.com', '987654321', 'Av. Tecnológica 123, Lima', 'activa'),
('TechSolutions Peru', '20451236987', 'info@techsolutions.pe', '01-425-8963', 'Jr. Las Camelias 456, San Isidro', 'activa'),
('Innovatech Global', '20895623147', 'rrhh@innovatech.com', '951753456', 'Av. Javier Prado Este 2040, San Borja', 'activa'),
('CyberGuard S.A.', '20361452987', 'soporte@cyberguard.pe', '01-789-4512', 'Av. Larco 789, Miraflores', 'por validar'),
('DataAI Systems', '20741258963', 'talento@dataai.com', '963258147', 'Calle Los Pinos 321, Magdalena', 'suspendida');

INSERT INTO aprendices (nombre, apellido, carrera_id, correo_institucional) VALUES
('Diego', 'Palomino Rey', 1, 'diego.palomino@institucion.edu.pe'),
('Milagros', 'Castro Soto', 1, 'milagros.castro@institucion.edu.pe'),
('Kevin', 'Mendoza Quispe', 1, 'kevin.mendoza@institucion.edu.pe'),
('Jorge', 'Huaman Flores', 2, 'jorge.huaman@institucion.edu.pe'),
('Lucia', 'Rojas Benitez', 2, 'lucia.rojas@institucion.edu.pe'),
('Renato', 'Guerrero Paz', 3, 'renato.guerrero@institucion.edu.pe'),
('Valeria', 'Campos Diaz', 3, 'valeria.campos@institucion.edu.pe');

INSERT INTO empresa_aprendices (id_estudiante, id_empresa, fecha_convenio, duracion) VALUES
(1, 1, '2026-02-15 08:00:00', '6 meses'),
(2, 1, '2026-02-15 08:00:00', '6 meses'),
(4, 1, '2026-03-01 09:00:00', '3 meses'), 
(5, 1, '2026-03-10 08:30:00', '6 meses'), 
(6, 1, '2026-04-01 09:00:00', '4 meses'), 
(3, 2, '2026-01-20 08:00:00', '6 meses'), 
(7, 2, '2026-01-20 08:00:00', '6 meses');

INSERT INTO usuarios (id, nombres, apellidos, numero, email, password, foto_url, rol_id) VALUES 
(1, 'Juan Roberto', 'Rivera Mendoza', '987654321', 'juan_32@senati.pe', '123456', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 2),
(2, 'Carlos Alberto', 'Gomez Salazar', '987654322', 'carlos_g@senati.pe', '123456', NULL, 2),
(3, 'Ana Maria', 'Fernandez Prado', '965412387', 'ana_f@senati.pe', '123456', NULL, 2),
(4, 'Luis Miguel', 'Torres Chavez', '941258763', 'luis_t@senati.pe', '123456', NULL, 2);

INSERT INTO instructores (usuario_id, carrera_id, dni, correo_personal) VALUES 
(1, 1, '72841526', 'juan.rivera@gmail.com'),
(2, 1, '45871236', 'carlos.gomez90@gmail.com'),
(3, 2, '71245896', 'ana.mar.fer@outlook.com'), 
(4, 3, '40258963', 'luismi.torres@gmail.com');

INSERT INTO empresa_monitor (id_Monitor, id_empresa) VALUES
(1, 1),
(3, 2),
(4, 3);