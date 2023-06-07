-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2022 a las 16:54:02
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sweis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `id_encuesta` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `objetivo` text NOT NULL,
  `fecha_creación` date NOT NULL,
  `fecha_publicacion` date NOT NULL,
  `fecha_cierre` date NOT NULL,
  `población` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuesta`
--

INSERT INTO `encuesta` (`id_encuesta`, `nombre`, `objetivo`, `fecha_creación`, `fecha_publicacion`, `fecha_cierre`, `población`) VALUES
(170, 'Finalización semestre academico', 'Encuesta para recolecta informacion de los estudiantes matriculados en el semeste II de 2022.', '2022-11-16', '2022-11-16', '2022-11-24', 122);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestado`
--

CREATE TABLE `encuestado` (
  `correo_electronico` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL DEFAULT '0000',
  `Rol` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuestado`
--

INSERT INTO `encuestado` (`correo_electronico`, `contrasena`, `Rol`) VALUES
('ingsoftwareufps@gmail.com', '$2a$12$qnfPOZYhZLMAq3dADdJnuelhyXDwe8/58NG5XswwixwQkIgxE9sFm', 1),
('jheyneralexanderld@ufps.edu.co', '$2a$12$p6k79ZHoBlWBNULlCMbazuifW4eRWncP/DCfhON.YHRog8CG/PZZC', 0),
('leideryesidmm@gmail.com', '$2a$12$r2LewG6sLHgTKPG9Gz7svOkW19oQSc0Oar9DL6jLvH8d1zMzKcp0S', 1),
('leideryesidmm@ufps.edu.co', '$2a$12$Oe17AiZVQKkGT/pxEH1yqOEXmKv1vGAh.j0a1amFkM5XITL3JtlPe', 0),
('matildealexandraal@ufps.edu.co', '$2a$12$7WNTzaAIYPUn7nqHSqV7Bef9Jh.u0QPTgG6K4NBXUecHZ9tHbc1La', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestado_poblacion`
--

CREATE TABLE `encuestado_poblacion` (
  `id_encuestado_poblacion` int(11) NOT NULL,
  `id_poblacion` int(11) NOT NULL,
  `encuestado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuestado_poblacion`
--

INSERT INTO `encuestado_poblacion` (`id_encuestado_poblacion`, `id_poblacion`, `encuestado`) VALUES
(191, 122, 'leideryesidmm@ufps.edu.co'),
(192, 122, 'matildealexandraal@ufps.edu.co'),
(193, 122, 'jheyneralexanderld@ufps.edu.co');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_contestada`
--

CREATE TABLE `encuesta_contestada` (
  `id_resp_enc` int(11) NOT NULL,
  `fecha_contestada` date NOT NULL,
  `id_encuesta` int(11) NOT NULL,
  `encuestado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuesta_contestada`
--

INSERT INTO `encuesta_contestada` (`id_resp_enc`, `fecha_contestada`, `id_encuesta`, `encuestado`) VALUES
(129, '2022-11-16', 170, 'matildealexandraal@ufps.edu.co');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcion`
--

CREATE TABLE `opcion` (
  `id_opcion` int(11) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opcion`
--

INSERT INTO `opcion` (`id_opcion`, `descripcion`, `pregunta`) VALUES
(237, 'menos de 3', 209),
(238, '4', 209),
(239, '5', 209),
(240, '6', 209),
(241, 'Lunes', 210),
(242, 'Martes', 210),
(243, 'Miercoles', 210),
(244, 'Jueves', 210),
(245, 'Viernes', 210),
(246, 'Sabado', 210);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcion_respuesta`
--

CREATE TABLE `opcion_respuesta` (
  `id_opcion_respuesta` int(11) NOT NULL,
  `pregunta_contestada` int(11) NOT NULL,
  `id_opcion` int(11) DEFAULT NULL,
  `descripcion_Abierta` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opcion_respuesta`
--

INSERT INTO `opcion_respuesta` (`id_opcion_respuesta`, `pregunta_contestada`, `id_opcion`, `descripcion_Abierta`) VALUES
(213, 282, 240, NULL),
(214, 283, NULL, 'muy buen semestre'),
(215, 284, 241, NULL),
(216, 284, 242, NULL),
(217, 284, 243, NULL),
(218, 284, 244, NULL),
(219, 284, 245, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poblacion`
--

CREATE TABLE `poblacion` (
  `id_poblacion` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `tamanio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `poblacion`
--

INSERT INTO `poblacion` (`id_poblacion`, `nombre`, `tamanio`) VALUES
(122, 'Estudiantes', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id_pregunta` int(11) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `obligatoriedad` tinyint(1) NOT NULL,
  `tipo` int(11) NOT NULL,
  `encuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id_pregunta`, `descripcion`, `obligatoriedad`, `tipo`, `encuesta`) VALUES
(209, '¿Cuantas materias matriculó este semestre?', 1, 1, 170),
(210, '¿Que dias tuvo clase?', 1, 2, 170),
(211, 'De una opinion de como le parecio el semestre', 1, 3, 170);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta_contestada`
--

CREATE TABLE `pregunta_contestada` (
  `id_pregunta_contestada` int(11) NOT NULL,
  `resp_enc` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `multiple` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pregunta_contestada`
--

INSERT INTO `pregunta_contestada` (`id_pregunta_contestada`, `resp_enc`, `id_pregunta`, `multiple`) VALUES
(282, 129, 209, NULL),
(283, 129, 211, NULL),
(284, 129, 210, '129210');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_pregunta`
--

CREATE TABLE `tipo_pregunta` (
  `id_tipo_pregunta` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_pregunta`
--

INSERT INTO `tipo_pregunta` (`id_tipo_pregunta`, `descripcion`) VALUES
(1, 'Selección única'),
(2, 'Selección múltiple'),
(3, 'Abierta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`id_encuesta`),
  ADD KEY `FK_Encuesta_poblacion` (`población`) USING BTREE;

--
-- Indices de la tabla `encuestado`
--
ALTER TABLE `encuestado`
  ADD PRIMARY KEY (`correo_electronico`);

--
-- Indices de la tabla `encuestado_poblacion`
--
ALTER TABLE `encuestado_poblacion`
  ADD PRIMARY KEY (`id_encuestado_poblacion`),
  ADD KEY `FK_encuestadopoblacion_encuestado` (`encuestado`),
  ADD KEY `FK_encuestadopoblacion_poblacion` (`id_poblacion`);

--
-- Indices de la tabla `encuesta_contestada`
--
ALTER TABLE `encuesta_contestada`
  ADD PRIMARY KEY (`id_resp_enc`),
  ADD KEY `FK_encuestacontestada_encuestado` (`encuestado`),
  ADD KEY `FK_encuestacontestada_encuesta` (`id_encuesta`) USING BTREE;

--
-- Indices de la tabla `opcion`
--
ALTER TABLE `opcion`
  ADD PRIMARY KEY (`id_opcion`),
  ADD KEY `FK_id_pregunta` (`pregunta`) USING BTREE;

--
-- Indices de la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  ADD PRIMARY KEY (`id_opcion_respuesta`),
  ADD KEY `FK_idopcionrespuesta_idopcion` (`id_opcion`),
  ADD KEY `FK_id_pregunta_contestada` (`pregunta_contestada`) USING BTREE;

--
-- Indices de la tabla `poblacion`
--
ALTER TABLE `poblacion`
  ADD PRIMARY KEY (`id_poblacion`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `FK_tipo_pregunta` (`tipo`) USING BTREE,
  ADD KEY `FK_id_encuesta` (`encuesta`) USING BTREE;

--
-- Indices de la tabla `pregunta_contestada`
--
ALTER TABLE `pregunta_contestada`
  ADD PRIMARY KEY (`id_pregunta_contestada`),
  ADD UNIQUE KEY `k_miltiple` (`multiple`),
  ADD KEY `FK_preguntacontestada_pregunta` (`id_pregunta`),
  ADD KEY `FK_id_resp_enc` (`resp_enc`) USING BTREE;

--
-- Indices de la tabla `tipo_pregunta`
--
ALTER TABLE `tipo_pregunta`
  ADD PRIMARY KEY (`id_tipo_pregunta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `id_encuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `encuestado_poblacion`
--
ALTER TABLE `encuestado_poblacion`
  MODIFY `id_encuestado_poblacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT de la tabla `encuesta_contestada`
--
ALTER TABLE `encuesta_contestada`
  MODIFY `id_resp_enc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `opcion`
--
ALTER TABLE `opcion`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT de la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  MODIFY `id_opcion_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT de la tabla `poblacion`
--
ALTER TABLE `poblacion`
  MODIFY `id_poblacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT de la tabla `pregunta_contestada`
--
ALTER TABLE `pregunta_contestada`
  MODIFY `id_pregunta_contestada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT de la tabla `tipo_pregunta`
--
ALTER TABLE `tipo_pregunta`
  MODIFY `id_tipo_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `FK_Encuesta_poblacion` FOREIGN KEY (`población`) REFERENCES `poblacion` (`id_poblacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuestado_poblacion`
--
ALTER TABLE `encuestado_poblacion`
  ADD CONSTRAINT `FK_encuestadopoblacion_encuestado` FOREIGN KEY (`encuestado`) REFERENCES `encuestado` (`correo_electronico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_encuestadopoblacion_poblacion` FOREIGN KEY (`id_poblacion`) REFERENCES `poblacion` (`id_poblacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuesta_contestada`
--
ALTER TABLE `encuesta_contestada`
  ADD CONSTRAINT `FK_encuestacontestada_encuesta` FOREIGN KEY (`id_encuesta`) REFERENCES `encuesta` (`id_encuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_encuestacontestada_encuestado` FOREIGN KEY (`encuestado`) REFERENCES `encuestado` (`correo_electronico`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opcion`
--
ALTER TABLE `opcion`
  ADD CONSTRAINT `opcion_ibfk_1` FOREIGN KEY (`pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  ADD CONSTRAINT `FK_idopcionrespuesta_idopcion` FOREIGN KEY (`id_opcion`) REFERENCES `opcion` (`id_opcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `opcion_respuesta_ibfk_1` FOREIGN KEY (`pregunta_contestada`) REFERENCES `pregunta_contestada` (`id_pregunta_contestada`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipo_pregunta` (`id_tipo_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pregunta_ibfk_2` FOREIGN KEY (`encuesta`) REFERENCES `encuesta` (`id_encuesta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pregunta_contestada`
--
ALTER TABLE `pregunta_contestada`
  ADD CONSTRAINT `FK_preguntacontestada_pregunta` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pregunta_contestada_ibfk_2` FOREIGN KEY (`resp_enc`) REFERENCES `encuesta_contestada` (`id_resp_enc`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
