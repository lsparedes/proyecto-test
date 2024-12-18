-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2024 a las 04:34:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `neurotest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alternativa`
--

CREATE TABLE `alternativa` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `texto_alternativa` text NOT NULL,
  `es_correcta` tinyint(1) NOT NULL,
  `id_pregunta` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alternativa`
--

INSERT INTO `alternativa` (`id`, `texto_alternativa`, `es_correcta`, `id_pregunta`, `created_at`, `updated_at`) VALUES
(1, 'alternativa 1', 0, 1, '2024-04-09 22:29:14', '2024-04-09 22:29:14'),
(2, 'alternativa 2', 1, 1, '2024-04-09 22:29:22', '2024-04-09 22:29:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criterio_evaluacion`
--

CREATE TABLE `criterio_evaluacion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre_Criterio` varchar(50) NOT NULL,
  `Descripcion_Criterio` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `criterio_evaluacion`
--

INSERT INTO `criterio_evaluacion` (`id`, `Nombre_Criterio`, `Descripcion_Criterio`, `created_at`, `updated_at`) VALUES
(1, 'Creatividad', 'Capacidad de la persona para producir, generar ideas novedosas al imaginar situaciones.', '2024-06-28 05:05:55', '2024-06-28 05:05:55'),
(2, 'Fluidez', 'Facilidad para expresar ideas, abundante vocabulario, claridad y coherencia', '2024-06-28 05:07:17', '2024-06-28 05:07:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criterio_evaluacion_test`
--

CREATE TABLE `criterio_evaluacion_test` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_criterio_evaluacion` bigint(20) UNSIGNED NOT NULL,
  `id_test` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `criterio_evaluacion_test`
--

INSERT INTO `criterio_evaluacion_test` (`id`, `id_criterio_evaluacion`, `id_test`, `created_at`, `updated_at`) VALUES
(1, 1, 11, '2024-06-28 05:06:13', '2024-06-28 05:06:13'),
(2, 2, 8, '2024-06-28 05:07:32', '2024-06-28 05:07:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examinador_persona_test`
--

CREATE TABLE `examinador_persona_test` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `test_id` bigint(20) UNSIGNED NOT NULL,
  `persons_id` bigint(20) UNSIGNED NOT NULL,
  `observacion` text NOT NULL,
  `fecha_observacion` text NOT NULL,
  `fecha_termino` datetime DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `csv_path` varchar(255) DEFAULT NULL,
  `image_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `audio_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `examinador_persona_test`
--

INSERT INTO `examinador_persona_test` (`id`, `users_id`, `test_id`, `persons_id`, `observacion`, `fecha_observacion`, `fecha_termino`, `puntuacion`, `duracion`, `created_at`, `updated_at`, `csv_path`, `image_path`, `audio_path`) VALUES
(20, 20, 4, 2, 'Persona de prueba', '2024-06-25 13:29:00', '2024-06-25 13:39:00', 25, 10, '2024-06-25 21:29:41', '2024-06-26 20:07:45', 'csv_files/Kls9Tf6VYK7PN4MM96JeadjO2gRzDFYFOTRCYKnT.txt', '\"[\\\"images\\\\\\/resultados.png\\\"]\"', '\"[\\\"audios\\\\\\/metacogn.mp3\\\"]\"');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formula`
--

CREATE TABLE `formula` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_formula` varchar(255) NOT NULL,
  `expresion_formula` varchar(255) NOT NULL,
  `peso_formula` double(8,2) NOT NULL,
  `id_criterio_evaluacion` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `formula`
--

INSERT INTO `formula` (`id`, `nombre_formula`, `expresion_formula`, `peso_formula`, `id_criterio_evaluacion`, `created_at`, `updated_at`) VALUES
(1, 'Tiempo promedio de respuesta', 'Suma de tiempos de todas las respuestas / Número total de respuestas', 100.00, 2, '2024-06-28 05:09:40', '2024-06-28 05:09:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metrica`
--

CREATE TABLE `metrica` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_metrica` varchar(50) NOT NULL,
  `peso_metrica` double(8,2) NOT NULL,
  `descripcion_metrica` varchar(255) NOT NULL,
  `id_criterio_evaluacion` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metrica`
--

INSERT INTO `metrica` (`id`, `nombre_metrica`, `peso_metrica`, `descripcion_metrica`, `id_criterio_evaluacion`, `created_at`, `updated_at`) VALUES
(1, 'Precisión', 100.00, 'Mide el porcentaje de predicciones que la persona acertó con respecto al total que hizo.', 2, '2024-06-28 05:11:58', '2024-06-28 05:11:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2024_01_23_183745_create_permission_tables', 1),
(5, '2024_01_24_143313_create_persons_table', 1),
(6, '2024_01_24_214914_create_tipo_test_table', 1),
(7, '2024_01_25_084037_create_test_table', 1),
(8, '2024_01_28_203125_add_columns_to_tipo_test_table', 1),
(9, '2024_01_30_044919_create_examinador_persona_test', 1),
(10, '2024_01_30_202448_create_pregunta_table', 1),
(11, '2024_01_30_203402_create_alternativa_table', 1),
(12, '2024_02_01_141210_create_respuesta_table', 1),
(13, '2024_02_02_162206_create_criterio_evaluacion_table', 1),
(14, '2024_02_02_203004_create_formula_table', 1),
(15, '2024_02_04_173231_create_metrica_table', 1),
(16, '2024_02_04_183258_create_criterio_evaluacion_test_table', 1),
(17, '2024_02_06_150821_drop_realization_date_to_test_table', 1),
(18, '2024_02_06_151806_add_duracion_to_test', 1),
(19, '2024_02_06_155909_drop_puntuacion_to_examinador_persona_test_table', 1),
(20, '2024_02_06_160511_add_puntuacion_and_fecha_termino_and_duracion_to_examinador_persona_test', 1),
(21, '2024_02_06_164925_drop_fecha_termino_to_examinador_persona_test_table', 1),
(22, '2024_02_06_165126_add_fecha_termino_to_examinador_persona_test', 1),
(23, '2024_02_29_154310_add_url_test_to_test', 2),
(24, '2024_03_01_203102_add_url_adicional_to_test_table', 3),
(25, '2024_04_09_195436_add_fuente_and_icono_to_tipo_test', 4),
(26, '2024_04_15_210611_add_nombre_esp_and_implementacion_to_tipo_test_table', 5),
(27, '2024_04_15_222724_add_nombre_espa_to_test_table', 6),
(28, '2024_04_16_170142_add_link_fuente_to_tipo_test_table', 7),
(29, '2024_04_19_171538_add_link_millisecond_and_link_millisecond2_to_test_table', 8),
(30, '2024_04_19_193346_add_instrucciones_adicionales_and_enlace_descarga_to_tipo_test_table', 9),
(31, '2024_06_23_204324_add_csv_and_image_path_to_examinador_persona_test', 10),
(32, '2024_06_25_173106_add_audio_path_to_examinador_persona_test_table', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 20),
(1, 'App\\Models\\User', 24),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('crisalarcon@live.com', '$2y$10$lqpYcQSwTqWtXerkFimux.5wiD0qlQKM2H0.omFgiaKvVItgZQ4lq', '2024-03-08 23:09:07'),
('usuario@ejemplo.com', '$2y$10$xaz06ozM350bItJh57rjzeDlGqFvz88UHhs8uZ41NaTkZbCVQMj/2', '2024-03-11 06:37:14'),
('admin@ejemplo.com', '$2y$10$MO1lQ7Mj5rlxesl/9BWwf.jEYELmraeRZUU/8CGTmQ5B8ZRf96wym', '2024-07-02 02:17:50'),
('pmonjes@ing.ucsc.cl', '$2y$10$qLdaPa0c/w81uZF3JTgjBuL.46u4BWkqDpE0gDOjMeX1EnRIDOnEq', '2024-12-12 05:46:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(2, 'administrador', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(3, 'users', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(4, 'add-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(5, 'edit-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(6, 'store-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(7, 'update-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(8, 'delete-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(9, 'show-user', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(10, 'persons', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(11, 'add-persons', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(12, 'edit-person', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(13, 'store-person', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(14, 'update-person', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(15, 'delete-person', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(16, 'tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(17, 'add-tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(18, 'edit-tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(19, 'store-tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(20, 'update-tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(21, 'delete-tipotest', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(22, 'tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(23, 'add-tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(24, 'edit-tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(25, 'store-tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(26, 'update-tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(27, 'delete-tests', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(28, 'examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(29, 'add-examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(30, 'store-examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(31, 'edit-examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(32, 'update-examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(33, 'delete-examinador-persona-test', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(34, 'pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(35, 'add-pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(36, 'store-pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(37, 'edit-pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(38, 'update-pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(39, 'delete-pregunta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(40, 'preguntas-y-alternativas', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(41, 'alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(42, 'add-alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(43, 'store-alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(44, 'edit-alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(45, 'update-alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(46, 'delete-alternativa', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(47, 'respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(48, 'add-respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(49, 'store-respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(50, 'edit-respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(51, 'update-respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(52, 'delete-respuesta', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(53, 'criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(54, 'add-criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(55, 'store-criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(56, 'edit-criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(57, 'update-criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(58, 'delete-criterio-evaluacion', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(59, 'formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(60, 'add-formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(61, 'store-formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(62, 'edit-formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(63, 'update-formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(64, 'delete-formula', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(65, 'metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(66, 'add-metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(67, 'store-metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(68, 'edit-metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(69, 'update-metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(70, 'delete-metrica', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(71, 'criterio_evaluacion_test', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(72, 'add-criterio_evaluacion_test', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(73, 'store.criterio_evaluacion_test', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(74, 'edit-criterio_evaluacion_test', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(75, 'update-criterio_evaluacion_test', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(76, 'criterio_evaluacion_test.destroy', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(77, 'permissions', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(78, 'permissions.create', 'web', '2024-02-10 00:41:34', '2024-02-10 00:41:34'),
(79, 'permissions.edit', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(80, 'permissions.store', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(81, 'permissions.show', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(82, 'permissions.update', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(83, 'permissions.destroy', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(84, 'roles', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(85, 'roles.create', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(86, 'roles.edit', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(87, 'roles.store', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(88, 'roles.show', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(89, 'roles.update', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35'),
(90, 'roles.destroy', 'web', '2024-02-10 00:41:35', '2024-02-10 00:41:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persons`
--

CREATE TABLE `persons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `persons`
--

INSERT INTO `persons` (`id`, `name`, `last_name`, `age`, `genre`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Sebastian', 'Perez', 36, 'Masculino', 1, '2024-02-27 20:00:28', '2024-06-26 20:06:33'),
(2, 'Daniela', 'Sanchez', 45, 'Femenino', 1, '2024-02-27 20:00:42', '2024-02-27 20:00:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `texto_pregunta` text NOT NULL,
  `tipo_respuesta` varchar(50) NOT NULL,
  `respuesta_correcta` varchar(255) NOT NULL,
  `id_test` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `texto_pregunta`, `tipo_respuesta`, `respuesta_correcta`, `id_test`, `created_at`, `updated_at`) VALUES
(1, 'Hola esto es una pregunta', 'texto', '2', 11, '2024-04-09 22:28:31', '2024-04-09 22:28:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `texto_respuesta` text NOT NULL,
  `id_pregunta` bigint(20) UNSIGNED NOT NULL,
  `id_test` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id`, `texto_respuesta`, `id_pregunta`, `id_test`, `created_at`, `updated_at`) VALUES
(1, 'Esta es la respuesta de pregunta 1', 1, 11, '2024-07-04 04:06:03', '2024-07-04 04:06:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(2, 'Examinador', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33'),
(3, 'Usuario', 'web', '2024-02-10 00:41:33', '2024-02-10 00:41:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(10, 2),
(11, 1),
(11, 2),
(12, 1),
(12, 2),
(13, 1),
(13, 2),
(14, 1),
(14, 2),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(22, 2),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(28, 2),
(29, 1),
(29, 2),
(30, 1),
(30, 2),
(31, 1),
(31, 2),
(32, 1),
(32, 2),
(33, 1),
(34, 1),
(34, 2),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(40, 2),
(41, 1),
(41, 2),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(47, 2),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(53, 2),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(59, 2),
(60, 1),
(61, 1),
(62, 1),
(63, 1),
(64, 1),
(65, 1),
(65, 2),
(66, 1),
(67, 1),
(68, 1),
(69, 1),
(70, 1),
(71, 1),
(71, 2),
(72, 1),
(73, 1),
(74, 1),
(75, 1),
(76, 1),
(77, 1),
(78, 1),
(79, 1),
(80, 1),
(81, 1),
(82, 1),
(83, 1),
(84, 1),
(85, 1),
(86, 1),
(87, 1),
(88, 1),
(89, 1),
(90, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_test` varchar(255) NOT NULL,
  `nombre_espa` varchar(255) DEFAULT NULL,
  `points` int(11) NOT NULL,
  `duracion_minutos` int(11) NOT NULL,
  `url_test` varchar(255) DEFAULT NULL,
  `url_adicional` varchar(255) DEFAULT NULL,
  `nombre_url` varchar(50) NOT NULL,
  `nombre_url_opcional` varchar(50) NOT NULL,
  `link_millisecond` varchar(255) DEFAULT NULL,
  `link_millisecond2` varchar(255) DEFAULT NULL,
  `tipotest_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`, `name_test`, `nombre_espa`, `points`, `duracion_minutos`, `url_test`, `url_adicional`, `nombre_url`, `nombre_url_opcional`, `link_millisecond`, `link_millisecond2`, `tipotest_id`, `created_at`, `updated_at`) VALUES
(1, 'HVLT-R', NULL, 1, 9, 'tests/HVLT-R/index.html', 'tests/HVLT-R/index2.html', 'Inmediato', 'Diferido', 'tests/HVLT-R/index3.html', NULL, 18, NULL, NULL),
(2, 'Trail Making Task', NULL, 30, 9, 'tests/TMT/index.html', 'tests/TMT/index2.html', 'Parte A', 'Parte B', NULL, NULL, 9, '2024-03-06 22:16:06', '2024-06-19 02:34:50'),
(3, 'D-KEFS Design Fluency', 'Fluidez de Diseño', 35, 2, 'tests/design-fluency/index.html', NULL, 'Iniciar', '', NULL, NULL, 17, '2024-06-19 02:27:02', '2024-07-06 03:35:32'),
(4, 'Cancelación de Letras A', NULL, 60, 3, 'tests/letters/index.html', NULL, 'Letras', '', '', NULL, 3, '2024-03-01 00:14:55', '2024-06-17 18:46:14'),
(5, 'VOSP Number Location', NULL, 11, 2, 'tests/number-location/index.html', NULL, 'Iniciar', '', NULL, NULL, 13, '2024-04-10 01:34:07', '2024-04-10 01:34:07'),
(6, 'Figura Compleja de Benson', 'Figura compleja de Benson', 3, 7, 'tests/benson/index.html', 'tests/benson/index2.html', 'Copia', 'Recuerdo', 'tests/benson/index3.html', NULL, 15, '2024-05-28 21:10:39', '2024-06-17 18:34:25'),
(7, 'mCCT', NULL, 32, 4, 'tests/camel-cactus/index.html', NULL, 'Iniciar', '', NULL, NULL, 12, '2024-04-10 01:30:17', '2024-04-29 19:35:27'),
(8, 'Fluidez Verbal', NULL, 50, 4, 'tests/verbal-fluency/categorias.html', 'tests/verbal-fluency/fonologia.html', 'Semántica', 'Fonológica', NULL, NULL, 8, '2024-03-06 22:07:51', '2024-07-06 05:39:50'),
(9, 'Span Verbal', NULL, 30, 6, 'tests/digit-span/forward.html', 'tests/digit-span/backward.html', 'Directo', 'Inverso', NULL, NULL, 7, '2024-03-06 18:25:18', '2024-06-17 18:38:25'),
(10, 'Span Visuoespacial', 'Cubos de Corsi', 50, 6, 'tests/corsi/forward/index.html', 'tests/corsi/backward/index.html', 'Directo', 'Inverso', NULL, NULL, 6, '2024-03-01 23:46:13', '2024-06-17 18:35:52'),
(11, 'Story based empathy', NULL, 60, 6, 'tests/story-based/index.html', NULL, 'Iniciar', '', NULL, NULL, 11, '2024-03-19 00:10:56', '2024-05-06 20:00:47'),
(12, 'Facial emotion recognition (from mini-SEA)', 'Reconocimiento facial de expresión emocional', 35, 4, 'tests/facial-emotion/index.html', NULL, 'Iniciar', '', NULL, NULL, 10, '2024-03-14 21:43:58', '2024-04-16 02:38:11'),
(13, 'VIENNA', NULL, 20, 14, 'tests/vienna/index.html', NULL, 'Iniciar', '', NULL, NULL, 4, '2024-03-01 00:15:36', '2024-06-24 22:16:39'),
(14, 'GFMT2-LOW', NULL, 40, 5, 'tests/glasgow/index.html', NULL, 'Iniciar', '', NULL, NULL, 5, '2024-02-07 17:23:32', '2024-06-17 18:39:26'),
(15, 'Perceptual Discrimination', NULL, 20, 11, 'tests/metacognition/index.html', NULL, 'Iniciar', '', NULL, NULL, 1, '2024-02-29 23:06:08', '2024-02-29 23:06:08'),
(16, 'two-armed bandit', NULL, 50, 4, 'tests/decision-making/index.html', NULL, 'Iniciar', '', NULL, NULL, 2, '2024-02-07 17:20:21', '2024-06-26 20:46:07'),
(17, 'Pantomime task', 'Pantomima del uso de objetos', 20, 5, 'tests/pantomime/index.html', NULL, 'Iniciar', '', NULL, NULL, 16, '2024-05-28 21:14:47', '2024-05-28 21:14:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_test`
--

CREATE TABLE `tipo_test` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `num_test` int(11) NOT NULL,
  `descripcion_test` text NOT NULL,
  `instruccion_test` text NOT NULL,
  `instrucciones_adicionales` varchar(255) DEFAULT NULL,
  `enlace_descarga` varchar(255) DEFAULT NULL,
  `audio_instruccion` varchar(255) NOT NULL,
  `fuente` varchar(255) DEFAULT NULL,
  `link_fuente` varchar(255) DEFAULT NULL,
  `icono` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `nombre_esp` varchar(255) DEFAULT NULL,
  `implementacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_test`
--

INSERT INTO `tipo_test` (`id`, `descripcion`, `num_test`, `descripcion_test`, `instruccion_test`, `instrucciones_adicionales`, `enlace_descarga`, `audio_instruccion`, `fuente`, `link_fuente`, `icono`, `created_at`, `updated_at`, `nombre_esp`, `implementacion`) VALUES
(1, 'Discriminación Perceptual', 15, 'El test de metacognición en discriminación perceptiva tiene como propósito evaluar la capacidad de los individuos para monitorizar y regular su propio proceso cognitivo durante tareas específicas de discriminación perceptiva.', 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.', NULL, NULL, '1707315549.mp3', 'Creación propia', 'https://github.com/marionrouault/metacognition-task-online', 'fa-solid fa-code', '2024-02-07 17:19:09', '2024-04-19 21:12:42', 'Metacognición', 'ejecución local'),
(2, 'Dos Máquinas Tragamonedas', 16, 'El problema implica un tomador de decisiones (agente) que se enfrenta a la elección entre dos acciones u opciones, cada una asociada con una distribución de recompensas desconocida. El objetivo del tomador de decisiones es aprender cuál acción proporciona la mayor recompensa esperada y utilizar este conocimiento para maximizar las recompensas.', 'En este experimento verás aparecer dos máquinas tragamonedas en la pantalla y deberás seleccionar una de ellas. Según tus elecciones, puedes ganar puntos.  Algunas máquinas tragamonedas te darán puntos con mayor o menor frecuencia que otras.  Su trabajo es descubrir qué máquina es la mejor para elegir y seleccionarla usando las flechas de su teclado.', NULL, NULL, '1718749333.mp3', 'Creación propia', 'https://gitlab.pavlovia.org/cherkasovabbalab/reinforcement-learning-two-armed-bandit', 'fa-solid fa-code', '2024-02-07 17:19:32', '2024-06-19 02:22:13', 'Toma de decisiones', 'ejecución local'),
(3, 'Cancelación de Letras A', 4, 'Los Tareas de Cancelación son pruebas neuropsicológicas diseñadas para evaluar diferentes aspectos de la atención, concentración y funciones ejecutivas. En el contexto de \"Letters & Bells\", estas tareas suelen implicar la búsqueda y marcado de objetivos específicos (como letras o símbolos) entre distracciones.', 'El test consta de 2 partes, en la primera debes seleccionar todas las campanas que pueda encontrar en la siguiente página.  Use el cursor para seleccionar las campanas ¡y sólo las campanas!,  Cuando crea que ha seleccionado todas las campanas pulse el botón \'validar\'. Para la segunda parte, debes realizar los mismos pasos, pero debes seleccionar todas las letras \'A\' que puedas encontrar en la imagen, trabaje tan rápido como pueda.   ¡Buena Suerte!', NULL, NULL, '1718633274.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-02-07 17:19:51', '2024-06-17 18:07:54', 'Test de cancelación', 'ejecución local'),
(4, 'VIENNA', 13, 'La Virtual Environments Navigation Assessment es una herramienta utilizada para evaluar las habilidades de navegación de las personas en entornos virtuales. Estos entornos pueden ser simulaciones de lugares reales, como calles o edificios, o mundos completamente ficticios creados por ordenador.', 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.', NULL, NULL, '1707315716.mp3', 'Creación propia', 'https://osf.io/kp4c5/', 'fa-solid fa-code', '2024-02-07 17:21:56', '2024-04-16 21:24:20', NULL, 'ejecución local'),
(5, 'GFMT2-Low', 14, 'Es una medida de la capacidad de los participantes para identificar si dos caras son la misma persona o no. Cada pregunta presenta dos imágenes de la misma persona o de dos personas diferentes. Los participantes deben responder a cada par de caras indicando si las dos caras son la misma persona o dos personas diferentes.', 'En esta prueba, verás imágenes de pares de rostros. Debes decidir si los rostros en cada imagen son iguales o diferentes. Haz clic en el botón correspondiente y luego presiona la flecha para pasar a la siguiente imagen.', NULL, NULL, '1718634466.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-02-07 17:22:27', '2024-06-17 18:27:46', NULL, 'ejecución local'),
(6, 'Span Visuoespacial', 10, 'El test de Span Espacial, también conocido como el test de Bloques de Corsi evalúa la memoria de trabajo visoespacial mostrando secuencias de bloques que los participantes deben repetir, hacia adelante en la versión \"forward\" y en orden inverso en la \"backward\".', 'Este test consta de 2 partes,  Para ambas partes, Se mostrará una secuencia de 2 a 9 cuadrados. Debe Memorizar la secuencia y tocar los cuadrados en la misma secuencia mostrada o en orden inverso, según corresponda, haciendo clic en los cuadrados. Se presentaran dos secuencias en cada longitud (16 secuencias en total) en orden creciente de longitud.  La prueba se terminará cuando se entreguen respuestas incorrectas para ambas secuencias.  La puntuación será el número total de secuencias realizadas correctamente.   ¡Buena Suerte!', NULL, NULL, '1718634192.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-01 00:21:54', '2024-06-25 23:22:28', NULL, 'ejecución local'),
(7, 'Span Verbal', 9, 'El test de Digit Span evalúa la memoria de trabajo auditiva al requerir que los participantes repitan secuencias de dígitos, tanto en el orden original como en el inverso. Este test proporciona información sobre la capacidad de retención de información a corto plazo, la atención y la capacidad de procesamiento auditivo.', 'Este test consta de 2 partes,  Para ambas partes, le voy a pedir que me repita unos números. Espere hasta que termine de decir los números y después me los repite en el mismo orden o en orden inverso segun corresponda. Por ejemplo, en la primera parte del test, si digo 1-8-7, usted me dice 1-8-7.  En la segunda parte, deberá repetir los números en orden inverso Por ejemplo, si yo le digo 3-7-4, usted me dice 4-7-3.  ¡Buena Suerte!', NULL, NULL, '1718633899.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-06 18:24:31', '2024-06-17 18:18:19', 'Test de memoria', 'ejecución local'),
(8, 'Fluidez Verbal', 8, 'El test de fluidez verbal mide la capacidad para generar palabras bajo ciertas restricciones en un periodo limitado, como nombrar animales o palabras que comienzan con una letra específica. Evalúa funciones ejecutivas, acceso al léxico y flexibilidad cognitiva. Se utiliza en diagnósticos neuropsicológicos para identificar problemas en áreas cerebrales asociadas al lenguaje y la memoria.', 'El test se divide en 2 etapas: Prueba Fonológica y Fluidez de Categorías. En este test, deberá reproducir un audio con las instrucciones de cada ítem. Su tarea es decir palabras que comiencen con la letra solicitada o palabras respecto a una categoría solicitada. Sus respuestas serán grabadas, para esto deberá presionar el botón comenzar grabación, tendrá 60 segundos para cada tarea. Cada grabación puede ser descargada', NULL, NULL, '1718632404.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-06 22:06:48', '2024-06-17 17:54:34', 'Fluidez verbal', 'ejecución local'),
(9, 'TMT', 2, 'El Test Trail Making Task evalúa la atención visual, velocidad de procesamiento, y flexibilidad cognitiva al pedir a los participantes que conecten una secuencia de números (Parte A) o números y letras alternadamente (Parte B) lo más rápido posible. Este test se utiliza para detectar disfunciones cerebrales y deterioro cognitivo. Es ampliamente usado en evaluaciones neuropsicológicas para medir la capacidad de cambio de tarea y el procesamiento visual-espacial.', 'En este test hay 2 partes. La primera es la Parte A, en esta parte habrán números dentro de unos círculos. Haga una línea de un número a otro, en orden. Empiece en el 1, luego vaya al 2, luego vaya al 3, y así sucesivamente. Por favor, trate de hacer una sola línea de un número a otro. La parte B, tendrá números y letras, los cuales deberá unir en orden. Empiece en el 1, luego vaya a la A, luego vaya al 2, y así sucesivamente.  Trabaje lo más rápido que pueda. Partiremos por la muestra A.', NULL, NULL, '1718632841.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-06 22:15:17', '2024-06-17 18:00:41', NULL, 'ejecución local'),
(10, 'Reconocimiento de Emociones Faciales ', 12, 'El test Facial Emotion Recognition (from mini-SEA) es una evaluación breve diseñada para medir la capacidad de reconocimiento de emociones faciales en individuos. Utiliza imágenes de rostros con expresiones emocionales para evaluar la habilidad de una persona para identificar y comprender diferentes emociones a través de señales faciales.', 'A continuacion se presentarán imagenes de caras. Se mostrarán una por una, las cuales expresan distintas emociónes, tales como: alegría, sorpresa, tristeza, miedo, asco, rabia o neutro cuando ninguna emoción es expresada, debe mirar cada cara atentamente y seleccionar que emoción está expresada sobre la cara. No es un test de rapidez, pero trate de ser relativamente rápido.', NULL, NULL, '1718634495.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-14 21:40:39', '2024-06-17 18:28:15', NULL, 'ejecución local'),
(11, 'SET', 11, 'El test de Story based empathy es una evaluación psicométrica que busca medir la capacidad de una persona para comprender y experimentar las emociones y perspectivas de los demás a través de historias o situaciones narrativas. Se basa en la capacidad del individuo para identificarse con los personajes y entender sus sentimientos, lo que proporciona información sobre su nivel de empatía y habilidades sociales.', 'A continuacion verás una historia representada en tres dibujos animados. Tu tarea es describir lo que les sucede a los personajes e intentar imaginar un posible final. Luego te mostraremos tres posibles finales y tu tarea será elegir el correcto para terminar la historia.', NULL, NULL, '1718634595.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-03-19 00:10:15', '2024-06-17 18:29:55', NULL, 'ejecución local'),
(12, 'mCCT', 7, 'El Modified Camel and Cactus Test (MCCT) presenta una imagen en la parte superior de la pantalla y cuatro imágenes en la parte inferior. Los participantes deben seleccionar la imagen que mejor se empareje con la imagen superior. Esta prueba evalúa habilidades cognitivas como la atención, la percepción visual, la memoria de trabajo y la flexibilidad cognitiva.', 'Se mostrarán 5 imágenes en la pantalla: una en la parte superior, y 4 en la parte inferior.  Debe elegir cuál de las 4 imágenes de la parte inferior se empareja mejor con la imagen en la parte superior. Use el ratón del ordenador para clicar sobre la imagen.  Habrán 3 ítems de practica y luego se comienza con el test.', NULL, NULL, '1718634381.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-04-10 01:29:19', '2024-06-17 18:26:21', NULL, 'ejecución local'),
(13, 'VOSP Number Location', 5, 'El VOSP Number Location Test evalúa la habilidad de ubicar y recordar números en un patrón de rejilla. Los participantes deben identificar y recordar la ubicación de los números presentados en una cuadrícula desordenada. Esta prueba evalúa la atención selectiva, la memoria visual y la capacidad de procesamiento visuoespacial.', 'Uno de los números del cuadrado corresponde con la posición del punto en el cuadrado, debe decir el número que coincide con la posición del punto. En la práctica 1 y 2, se le mostrará la retroalimentación de su respuesta antes de pasar a la siguiente tarjeta.', NULL, NULL, '1718634435.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-04-10 01:33:21', '2024-06-17 18:27:15', NULL, 'ejecución local'),
(15, 'Figura Compleja de Benson', 6, 'El test de la figura compleja de Benson evalúa las habilidades visoespaciales y de memoria a través de dos tareas: copiar una figura compleja y, posteriormente, recordar y dibujar la figura sin verla. Es una herramienta usada en la evaluación neuropsicológica para detectar déficits cognitivos relacionados con funciones ejecutivas y memoria visual', 'Este test consta de tres partes:  1-Copiar la Figura: Se presentará una figura, la cual debe copiar lo más exacta posible. 2- Recuerdo Diferido: Pasado un tiempo, deberá dibujar la misma figura de memoria, sin ayudas 3-Identificar figura: Se presentará una sección para identificar la figura dibujada.', NULL, NULL, '1718634248.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-05-28 21:09:29', '2024-06-17 18:24:08', 'Figura compleja de Benson', 'ejecución local'),
(16, 'Pantomima del Uso de Objetos', 17, 'La tarea de pantomima evalúa la habilidad de una persona para representar acciones o usar objetos sin hablar ni utilizar los objetos reales, imitando su uso. Se utiliza en neuropsicología para evaluar la praxis, que es la capacidad de planificar y ejecutar movimientos coordinados. Este test ayuda a identificar problemas en el control motor y la representación simbólica de acciones.', 'En esta prueba, quiero que imagine que sostiene el objeto que le voy a mostrar a continuación en su mano. Es importante que recuerde no usar su mano o dedos como si fuese el objeto. Use los botones para grabar y detener la grabación.', NULL, NULL, '1718634645.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-05-28 21:13:04', '2024-06-17 18:30:45', 'Test de pantomima', 'ejecución local'),
(17, 'D-KEFS Design Fluency', 3, 'El test de Fluidez de Diseño evalúa la capacidad creativa y ejecutiva del individuo a través de la generación de patrones o figuras abstractas en un tiempo limitado. Los participantes deben crear tantos diseños únicos como puedan en un tiempo determinado, sin repetir formas o usar símbolos familiares. Esta prueba mide funciones ejecutivas, habilidades visuoespaciales y pensamiento divergente.', 'En este test, debes unir todos los puntos en cada uno de los cuadros de la imagen. Usa el mouse para dibujar líneas entre los puntos. Debes dibujar tantos diseños diferentes como pueda hasta que le diga que pare. Recuerde usar solo cuatro líneas rectas para conectar los puntos. Trabaje lo más rápido que puedas y trate que cada diseño sea diferente.', NULL, NULL, '1718749496.mp3', 'Creación propia', NULL, 'fa-solid fa-code', '2024-06-19 02:24:56', '2024-06-19 02:24:56', 'Fluidez de Diseño', 'ejecución local'),
(18, 'HVLT-R', 1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quos! Voluptate iure ipsam ut numquam nihil, sit sint unde enim. Magnam nulla blanditiis a! Ipsum at fugit quidem. Distinctio, eaque!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quos! Voluptate iure ipsam ut numquam nihil, sit sint unde enim. Magnam nulla blanditiis a! Ipsum at fugit quidem. Distinctio, eaque!', NULL, NULL, '1722272096.mp3', 'Creación propia', 'test/HVLT-R/index.html', 'fa-solid fa-code', '2024-07-29 20:54:56', '2024-07-29 23:04:43', 'HVLT-R', 'ejecución local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Ejemplo', 'admin@ejemplo.com', NULL, '$2y$10$8noAUwMlRrqYzbfkBvzGruxLg00I5LArisQemjvYFtSrN1kZ7nagu', 'cWJFuzt1xl4FHvfbhv4GeSmzroiRQo5KhctNG4pPbRyhtN0MqajVcOC2IA6s', '2024-02-10 00:41:35', '2024-12-18 05:56:27'),
(2, 'examinador', 'prueba', 'prueba@ejemplo.com', NULL, '$2y$10$NBdlfDiMZ1ZQuYGd1UCLMe0leFfIia1UKlyKfE4.Q5cqm5JJvWFpe', NULL, '2024-02-27 21:11:35', '2024-12-18 05:56:45'),
(20, 'Diego', 'Lorca', 'usuario@ejemplo.com', NULL, '$2y$10$jg4kvz4MWBYkR5jLeWULM.Tu8pG31V208fG71SQM5UM13FjPfZmIK', NULL, '2024-03-11 05:34:01', '2024-12-18 05:56:56'),
(23, 'visitante', 'Visitante', 'visitante@ejemplo.com', NULL, '$2y$10$rUwCL9XoyJpwh05WaSuL9OBqWF602odua.4wry/r8/i7MRgXiypN2', NULL, '2024-03-19 21:56:47', '2024-12-18 05:57:12'),
(24, 'Pablo', 'Monjes', 'pmonjes@ing.ucsc.cl', NULL, '$2y$10$vHz7P17OuEle3Pcfl1R5Qe/EuFRe0811uEzxLPWU3XHULTS..JD.K', NULL, '2024-12-12 05:45:10', '2024-12-18 05:57:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alternativa`
--
ALTER TABLE `alternativa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alternativa_id_pregunta_foreign` (`id_pregunta`);

--
-- Indices de la tabla `criterio_evaluacion`
--
ALTER TABLE `criterio_evaluacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `criterio_evaluacion_test`
--
ALTER TABLE `criterio_evaluacion_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `criterio_evaluacion_test_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`),
  ADD KEY `criterio_evaluacion_test_id_test_foreign` (`id_test`);

--
-- Indices de la tabla `examinador_persona_test`
--
ALTER TABLE `examinador_persona_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examinador_persona_test_users_id_foreign` (`users_id`),
  ADD KEY `examinador_persona_test_test_id_foreign` (`test_id`),
  ADD KEY `examinador_persona_test_persons_id_foreign` (`persons_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `formula`
--
ALTER TABLE `formula`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formula_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`);

--
-- Indices de la tabla `metrica`
--
ALTER TABLE `metrica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `metrica_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pregunta_id_test_foreign` (`id_test`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respuesta_id_pregunta_foreign` (`id_pregunta`),
  ADD KEY `respuesta_id_test_foreign` (`id_test`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_tipotest_id_foreign` (`tipotest_id`);

--
-- Indices de la tabla `tipo_test`
--
ALTER TABLE `tipo_test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alternativa`
--
ALTER TABLE `alternativa`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `criterio_evaluacion`
--
ALTER TABLE `criterio_evaluacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `criterio_evaluacion_test`
--
ALTER TABLE `criterio_evaluacion_test`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `examinador_persona_test`
--
ALTER TABLE `examinador_persona_test`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formula`
--
ALTER TABLE `formula`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `metrica`
--
ALTER TABLE `metrica`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `persons`
--
ALTER TABLE `persons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `tipo_test`
--
ALTER TABLE `tipo_test`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alternativa`
--
ALTER TABLE `alternativa`
  ADD CONSTRAINT `alternativa_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `criterio_evaluacion_test`
--
ALTER TABLE `criterio_evaluacion_test`
  ADD CONSTRAINT `criterio_evaluacion_test_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `criterio_evaluacion_test_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `examinador_persona_test`
--
ALTER TABLE `examinador_persona_test`
  ADD CONSTRAINT `examinador_persona_test_persons_id_foreign` FOREIGN KEY (`persons_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examinador_persona_test_test_id_foreign` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examinador_persona_test_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `formula`
--
ALTER TABLE `formula`
  ADD CONSTRAINT `formula_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `metrica`
--
ALTER TABLE `metrica`
  ADD CONSTRAINT `metrica_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuesta_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_tipotest_id_foreign` FOREIGN KEY (`tipotest_id`) REFERENCES `tipo_test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
