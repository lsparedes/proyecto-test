-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: neurotest
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alternativa`
--

DROP TABLE IF EXISTS `alternativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alternativa` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `texto_alternativa` text NOT NULL,
  `es_correcta` tinyint(1) NOT NULL,
  `id_pregunta` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alternativa_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `alternativa_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativa`
--

LOCK TABLES `alternativa` WRITE;
/*!40000 ALTER TABLE `alternativa` DISABLE KEYS */;
INSERT INTO `alternativa` VALUES (1,'alternativa 1',0,1,'2024-04-09 22:29:14','2024-04-09 22:29:14'),(2,'alternativa 2',1,1,'2024-04-09 22:29:22','2024-04-09 22:29:22');
/*!40000 ALTER TABLE `alternativa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterio_evaluacion`
--

DROP TABLE IF EXISTS `criterio_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterio_evaluacion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre_Criterio` varchar(50) NOT NULL,
  `Descripcion_Criterio` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterio_evaluacion`
--

LOCK TABLES `criterio_evaluacion` WRITE;
/*!40000 ALTER TABLE `criterio_evaluacion` DISABLE KEYS */;
INSERT INTO `criterio_evaluacion` VALUES (1,'Creatividad','Capacidad de la persona para producir, generar ideas novedosas al imaginar situaciones.','2024-06-28 05:05:55','2024-06-28 05:05:55'),(2,'Fluidez','Facilidad para expresar ideas, abundante vocabulario, claridad y coherencia','2024-06-28 05:07:17','2024-06-28 05:07:17');
/*!40000 ALTER TABLE `criterio_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterio_evaluacion_test`
--

DROP TABLE IF EXISTS `criterio_evaluacion_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterio_evaluacion_test` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_criterio_evaluacion` bigint(20) unsigned NOT NULL,
  `id_test` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `criterio_evaluacion_test_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`),
  KEY `criterio_evaluacion_test_id_test_foreign` (`id_test`),
  CONSTRAINT `criterio_evaluacion_test_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `criterio_evaluacion_test_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterio_evaluacion_test`
--

LOCK TABLES `criterio_evaluacion_test` WRITE;
/*!40000 ALTER TABLE `criterio_evaluacion_test` DISABLE KEYS */;
INSERT INTO `criterio_evaluacion_test` VALUES (1,1,11,'2024-06-28 05:06:13','2024-06-28 05:06:13'),(2,2,8,'2024-06-28 05:07:32','2024-06-28 05:07:32');
/*!40000 ALTER TABLE `criterio_evaluacion_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examinador_persona_test`
--

DROP TABLE IF EXISTS `examinador_persona_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examinador_persona_test` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` bigint(20) unsigned NOT NULL,
  `test_id` bigint(20) unsigned NOT NULL,
  `persons_id` bigint(20) unsigned NOT NULL,
  `observacion` text NOT NULL,
  `fecha_observacion` text NOT NULL,
  `fecha_termino` datetime DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `csv_path` varchar(255) DEFAULT NULL,
  `image_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `audio_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `examinador_persona_test_users_id_foreign` (`users_id`),
  KEY `examinador_persona_test_test_id_foreign` (`test_id`),
  KEY `examinador_persona_test_persons_id_foreign` (`persons_id`),
  CONSTRAINT `examinador_persona_test_persons_id_foreign` FOREIGN KEY (`persons_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `examinador_persona_test_test_id_foreign` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `examinador_persona_test_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examinador_persona_test`
--

LOCK TABLES `examinador_persona_test` WRITE;
/*!40000 ALTER TABLE `examinador_persona_test` DISABLE KEYS */;
INSERT INTO `examinador_persona_test` VALUES (20,20,4,2,'Persona de prueba','2024-06-25 13:29:00','2024-06-25 13:39:00',25,10,'2024-06-25 21:29:41','2024-06-26 20:07:45','csv_files/Kls9Tf6VYK7PN4MM96JeadjO2gRzDFYFOTRCYKnT.txt','\"[\\\"images\\\\\\/resultados.png\\\"]\"','\"[\\\"audios\\\\\\/metacogn.mp3\\\"]\"');
/*!40000 ALTER TABLE `examinador_persona_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formula`
--

DROP TABLE IF EXISTS `formula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formula` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_formula` varchar(255) NOT NULL,
  `expresion_formula` varchar(255) NOT NULL,
  `peso_formula` double(8,2) NOT NULL,
  `id_criterio_evaluacion` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `formula_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`),
  CONSTRAINT `formula_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formula`
--

LOCK TABLES `formula` WRITE;
/*!40000 ALTER TABLE `formula` DISABLE KEYS */;
INSERT INTO `formula` VALUES (1,'Tiempo promedio de respuesta','Suma de tiempos de todas las respuestas / Número total de respuestas',100.00,2,'2024-06-28 05:09:40','2024-06-28 05:09:40');
/*!40000 ALTER TABLE `formula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metrica`
--

DROP TABLE IF EXISTS `metrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metrica` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_metrica` varchar(50) NOT NULL,
  `peso_metrica` double(8,2) NOT NULL,
  `descripcion_metrica` varchar(255) NOT NULL,
  `id_criterio_evaluacion` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `metrica_id_criterio_evaluacion_foreign` (`id_criterio_evaluacion`),
  CONSTRAINT `metrica_id_criterio_evaluacion_foreign` FOREIGN KEY (`id_criterio_evaluacion`) REFERENCES `criterio_evaluacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metrica`
--

LOCK TABLES `metrica` WRITE;
/*!40000 ALTER TABLE `metrica` DISABLE KEYS */;
INSERT INTO `metrica` VALUES (1,'Precisión',100.00,'Mide el porcentaje de predicciones que la persona acertó con respecto al total que hizo.',2,'2024-06-28 05:11:58','2024-06-28 05:11:58');
/*!40000 ALTER TABLE `metrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2024_01_23_183745_create_permission_tables',1),(5,'2024_01_24_143313_create_persons_table',1),(6,'2024_01_24_214914_create_tipo_test_table',1),(7,'2024_01_25_084037_create_test_table',1),(8,'2024_01_28_203125_add_columns_to_tipo_test_table',1),(9,'2024_01_30_044919_create_examinador_persona_test',1),(10,'2024_01_30_202448_create_pregunta_table',1),(11,'2024_01_30_203402_create_alternativa_table',1),(12,'2024_02_01_141210_create_respuesta_table',1),(13,'2024_02_02_162206_create_criterio_evaluacion_table',1),(14,'2024_02_02_203004_create_formula_table',1),(15,'2024_02_04_173231_create_metrica_table',1),(16,'2024_02_04_183258_create_criterio_evaluacion_test_table',1),(17,'2024_02_06_150821_drop_realization_date_to_test_table',1),(18,'2024_02_06_151806_add_duracion_to_test',1),(19,'2024_02_06_155909_drop_puntuacion_to_examinador_persona_test_table',1),(20,'2024_02_06_160511_add_puntuacion_and_fecha_termino_and_duracion_to_examinador_persona_test',1),(21,'2024_02_06_164925_drop_fecha_termino_to_examinador_persona_test_table',1),(22,'2024_02_06_165126_add_fecha_termino_to_examinador_persona_test',1),(23,'2024_02_29_154310_add_url_test_to_test',2),(24,'2024_03_01_203102_add_url_adicional_to_test_table',3),(25,'2024_04_09_195436_add_fuente_and_icono_to_tipo_test',4),(26,'2024_04_15_210611_add_nombre_esp_and_implementacion_to_tipo_test_table',5),(27,'2024_04_15_222724_add_nombre_espa_to_test_table',6),(28,'2024_04_16_170142_add_link_fuente_to_tipo_test_table',7),(29,'2024_04_19_171538_add_link_millisecond_and_link_millisecond2_to_test_table',8),(30,'2024_04_19_193346_add_instrucciones_adicionales_and_enlace_descarga_to_tipo_test_table',9),(31,'2024_06_23_204324_add_csv_and_image_path_to_examinador_persona_test',10),(32,'2024_06_25_173106_add_audio_path_to_examinador_persona_test_table',11),(33,'2026_03_11_041840_add_descripcion_individual_to_test_table',12),(34,'2026_04_12_220004_add_modulo_to_tests_table',13),(35,'2026_04_12_230100_create_modulo3_parts_table',14),(36,'2026_04_12_230200_create_modulo3_subtests_table',14);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(1,'App\\Models\\User',20),(1,'App\\Models\\User',24),(2,'App\\Models\\User',2),(2,'App\\Models\\User',4),(2,'App\\Models\\User',5),(2,'App\\Models\\User',23);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo3_parts`
--

DROP TABLE IF EXISTS `modulo3_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo3_parts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `modulo3_parts_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo3_parts`
--

LOCK TABLES `modulo3_parts` WRITE;
/*!40000 ALTER TABLE `modulo3_parts` DISABLE KEYS */;
INSERT INTO `modulo3_parts` VALUES (1,'procesos-motores-basicos','Part 1: Procesos Motores Basicos','Base estructural para pruebas de evaluacion orofacial y de respiracion, fonacion y resonancia.',1,1,'2026-04-13 07:46:24','2026-04-13 07:46:24'),(2,'evaluacion-motora-del-habla','Part 2: Evaluacion Motora del Habla','Contiene placeholders para tareas guiadas de produccion motora del habla.',2,1,'2026-04-13 07:46:24','2026-04-13 07:46:24'),(3,'habla-conectada','Part 3: Habla Conectada','Espacio base para tareas de descripcion y narracion en contexto.',3,1,'2026-04-13 07:46:24','2026-04-13 07:46:24');
/*!40000 ALTER TABLE `modulo3_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo3_subtests`
--

DROP TABLE IF EXISTS `modulo3_subtests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo3_subtests` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `modulo3_part_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'placeholder',
  `placeholder_note` text DEFAULT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `modulo3_subtests_slug_unique` (`slug`),
  KEY `modulo3_subtests_modulo3_part_id_foreign` (`modulo3_part_id`),
  CONSTRAINT `modulo3_subtests_modulo3_part_id_foreign` FOREIGN KEY (`modulo3_part_id`) REFERENCES `modulo3_parts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo3_subtests`
--

LOCK TABLES `modulo3_subtests` WRITE;
/*!40000 ALTER TABLE `modulo3_subtests` DISABLE KEYS */;
INSERT INTO `modulo3_subtests` VALUES (1,1,'evaluacion-orofacial','Evaluacion Orofacial','Part 1','Placeholder para observacion estructurada de funciones orofaciales.','Aqui se conectaran formularios, assets y criterios clinicos especificos.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',1,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(2,1,'evaluacion-integrada-respiracion-fonacion-resonancia','Evaluacion Integrada de la Respiracion, la Fonacion y la Resonancia','Part 1','Placeholder para integrar observaciones respiratorias, fonatorias y de resonancia.','Pendiente de conectar assets, grabacion y logica de evaluacion.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',2,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(3,2,'volumen-creciente','Volumen creciente','Part 2','Placeholder para una tarea guiada con control progresivo de intensidad.','Pendiente de instrucciones definitivas y captura de resultados.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',1,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(4,2,'habla-automatica','Habla automatica','Part 2','Placeholder para secuencias automaticas del habla.','Pendiente de texto, metrificacion y assets de apoyo.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',2,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(5,2,'repeticion-de-silabas-diadococinesia','Repeticion de silabas - diadococinesia','Part 2','Placeholder para repeticion secuencial y alternante de silabas.','Pendiente de cronometraje y captura de desempeno.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',3,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(6,2,'lectura','Lectura','Part 2','Placeholder para lectura guiada con posterior analisis.','Pendiente de cargar textos y logica de evaluacion.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',4,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(7,2,'diptongos','Diptongos','Part 2','Placeholder para tarea focalizada en produccion de diptongos.','Pendiente de banco de items y scoring.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',5,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(8,2,'palabras-polisilabicas','Palabras polisilabicas','Part 2','Placeholder para produccion de palabras de mayor complejidad silabica.','Pendiente de lista de estimulos y criterios de analisis.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',6,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(9,2,'palabras-con-longitud-creciente','Palabras con longitud creciente','Part 2','Placeholder para serie progresiva de longitud lexical.','Pendiente de definir escalas y respuesta esperada.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',7,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(10,2,'pseudopalabras','Pseudopalabras','Part 2','Placeholder para repeticion o lectura de pseudopalabras.','Pendiente de corpus y metrica de produccion.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',8,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(11,2,'repeticion-de-frases','Repeticion de frases','Part 2','Placeholder para repeticion guiada de frases.','Pendiente de materiales y validacion de respuesta.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',9,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(12,2,'lectura-de-frases','Lectura de frases','Part 2','Placeholder para lectura de frases con analisis posterior.','Pendiente de assets textuales y logica de evaluacion.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',10,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(13,3,'descripcion-de-una-imagen','Descripcion de una imagen','Part 3','Placeholder para elicitacion discursiva a partir de una imagen.','Pendiente de conectar imagenes y captura de audio/video.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',1,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(14,3,'narracion-de-una-historia','Narracion de una historia','Part 3','Placeholder para relato estructurado basado en historia.','Pendiente de assets narrativos y rubricado clinico.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',2,1,'2026-04-13 07:46:27','2026-04-13 07:46:27'),(15,3,'narracion-personal','Narracion personal','Part 3','Placeholder para produccion de narracion autobiografica guiada.','Pendiente de prompts y logica de analisis.','placeholder','Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',3,1,'2026-04-13 07:46:27','2026-04-13 07:46:27');
/*!40000 ALTER TABLE `modulo3_subtests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES ('crisalarcon@live.com','$2y$10$lqpYcQSwTqWtXerkFimux.5wiD0qlQKM2H0.omFgiaKvVItgZQ4lq','2024-03-08 23:09:07'),('usuario@ejemplo.com','$2y$10$xaz06ozM350bItJh57rjzeDlGqFvz88UHhs8uZ41NaTkZbCVQMj/2','2024-03-11 06:37:14'),('admin@ejemplo.com','$2y$10$MO1lQ7Mj5rlxesl/9BWwf.jEYELmraeRZUU/8CGTmQ5B8ZRf96wym','2024-07-02 02:17:50'),('pmonjes@ing.ucsc.cl','$2y$10$qLdaPa0c/w81uZF3JTgjBuL.46u4BWkqDpE0gDOjMeX1EnRIDOnEq','2024-12-12 05:46:27');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'dashboard','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(2,'administrador','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(3,'users','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(4,'add-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(5,'edit-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(6,'store-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(7,'update-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(8,'delete-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(9,'show-user','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(10,'persons','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(11,'add-persons','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(12,'edit-person','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(13,'store-person','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(14,'update-person','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(15,'delete-person','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(16,'tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(17,'add-tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(18,'edit-tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(19,'store-tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(20,'update-tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(21,'delete-tipotest','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(22,'tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(23,'add-tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(24,'edit-tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(25,'store-tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(26,'update-tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(27,'delete-tests','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(28,'examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(29,'add-examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(30,'store-examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(31,'edit-examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(32,'update-examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(33,'delete-examinador-persona-test','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(34,'pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(35,'add-pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(36,'store-pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(37,'edit-pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(38,'update-pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(39,'delete-pregunta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(40,'preguntas-y-alternativas','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(41,'alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(42,'add-alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(43,'store-alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(44,'edit-alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(45,'update-alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(46,'delete-alternativa','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(47,'respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(48,'add-respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(49,'store-respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(50,'edit-respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(51,'update-respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(52,'delete-respuesta','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(53,'criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(54,'add-criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(55,'store-criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(56,'edit-criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(57,'update-criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(58,'delete-criterio-evaluacion','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(59,'formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(60,'add-formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(61,'store-formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(62,'edit-formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(63,'update-formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(64,'delete-formula','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(65,'metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(66,'add-metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(67,'store-metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(68,'edit-metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(69,'update-metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(70,'delete-metrica','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(71,'criterio_evaluacion_test','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(72,'add-criterio_evaluacion_test','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(73,'store.criterio_evaluacion_test','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(74,'edit-criterio_evaluacion_test','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(75,'update-criterio_evaluacion_test','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(76,'criterio_evaluacion_test.destroy','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(77,'permissions','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(78,'permissions.create','web','2024-02-10 00:41:34','2024-02-10 00:41:34'),(79,'permissions.edit','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(80,'permissions.store','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(81,'permissions.show','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(82,'permissions.update','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(83,'permissions.destroy','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(84,'roles','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(85,'roles.create','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(86,'roles.edit','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(87,'roles.store','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(88,'roles.show','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(89,'roles.update','web','2024-02-10 00:41:35','2024-02-10 00:41:35'),(90,'roles.destroy','web','2024-02-10 00:41:35','2024-02-10 00:41:35');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'Sebastian','Perez',36,'Masculino',1,'2024-02-27 20:00:28','2024-06-26 20:06:33'),(2,'Daniela','Sanchez',45,'Femenino',1,'2024-02-27 20:00:42','2024-02-27 20:00:42');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `texto_pregunta` text NOT NULL,
  `tipo_respuesta` varchar(50) NOT NULL,
  `respuesta_correcta` varchar(255) NOT NULL,
  `id_test` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pregunta_id_test_foreign` (`id_test`),
  CONSTRAINT `pregunta_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'Hola esto es una pregunta','texto','2',11,'2024-04-09 22:28:31','2024-04-09 22:28:31');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respuesta` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `texto_respuesta` text NOT NULL,
  `id_pregunta` bigint(20) unsigned NOT NULL,
  `id_test` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `respuesta_id_pregunta_foreign` (`id_pregunta`),
  KEY `respuesta_id_test_foreign` (`id_test`),
  CONSTRAINT `respuesta_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `respuesta_id_test_foreign` FOREIGN KEY (`id_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` VALUES (1,'Esta es la respuesta de pregunta 1',1,11,'2024-07-04 04:06:03','2024-07-04 04:06:03');
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(1,2),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(10,2),(11,1),(11,2),(12,1),(12,2),(13,1),(13,2),(14,1),(14,2),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(22,2),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(28,2),(29,1),(29,2),(30,1),(30,2),(31,1),(31,2),(32,1),(32,2),(33,1),(34,1),(34,2),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(40,2),(41,1),(41,2),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(47,2),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(53,2),(54,1),(55,1),(56,1),(57,1),(58,1),(59,1),(59,2),(60,1),(61,1),(62,1),(63,1),(64,1),(65,1),(65,2),(66,1),(67,1),(68,1),(69,1),(70,1),(71,1),(71,2),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(80,1),(81,1),(82,1),(83,1),(84,1),(85,1),(86,1),(87,1),(88,1),(89,1),(90,1);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(2,'Examinador','web','2024-02-10 00:41:33','2024-02-10 00:41:33'),(3,'Usuario','web','2024-02-10 00:41:33','2024-02-10 00:41:33');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name_test` varchar(255) NOT NULL,
  `nombre_espa` varchar(255) DEFAULT NULL,
  `descripcion_individual` text DEFAULT NULL,
  `modulo` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `duracion_minutos` int(11) NOT NULL,
  `url_test` varchar(255) DEFAULT NULL,
  `url_adicional` varchar(255) DEFAULT NULL,
  `nombre_url` varchar(50) NOT NULL,
  `nombre_url_opcional` varchar(50) DEFAULT NULL,
  `link_millisecond` varchar(255) DEFAULT NULL,
  `link_millisecond2` varchar(255) DEFAULT NULL,
  `tipotest_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test_tipotest_id_foreign` (`tipotest_id`),
  CONSTRAINT `test_tipotest_id_foreign` FOREIGN KEY (`tipotest_id`) REFERENCES `tipo_test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'HVLT-R',NULL,NULL,1,1,9,'tests/modulo1/HVLT-R/index.html','tests/modulo1/HVLT-R/index2.html','Inmediato','Diferido','tests/modulo1/HVLT-R/index3.html',NULL,18,NULL,NULL),(2,'TMT',NULL,NULL,1,30,9,'tests/modulo1/TMT/index.html','tests/modulo1/TMT/index2.html','Parte A','Parte B',NULL,NULL,9,'2024-03-06 22:16:06','2024-06-19 02:34:50'),(3,'D-KEFS Design Fluency','Fluidez de Diseño',NULL,1,35,2,'tests/modulo1/design-fluency/index.html',NULL,'Iniciar','',NULL,NULL,17,'2024-06-19 02:27:02','2024-07-06 03:35:32'),(4,'Cancelación de Letras A',NULL,NULL,1,60,3,'tests/modulo1/letters/index.html',NULL,'Letras','','',NULL,3,'2024-03-01 00:14:55','2024-06-17 18:46:14'),(5,'VOSP Number Location',NULL,NULL,1,11,2,'tests/modulo1/number-location/index.html',NULL,'Iniciar','',NULL,NULL,13,'2024-04-10 01:34:07','2024-04-10 01:34:07'),(6,'Figura Compleja de Benson','Figura compleja de Benson',NULL,1,3,7,'tests/modulo1/benson/index.html','tests/modulo1/benson/index2.html','Copia','Recuerdo','tests/modulo1/benson/index3.html',NULL,15,'2024-05-28 21:10:39','2024-06-17 18:34:25'),(7,'mCCT',NULL,NULL,1,32,4,'tests/modulo1/camel-cactus/index.html',NULL,'Iniciar','',NULL,NULL,12,'2024-04-10 01:30:17','2024-04-29 19:35:27'),(8,'Fluidez Verbal',NULL,NULL,1,50,4,'tests/modulo1/verbal-fluency/categorias.html','tests/modulo1/verbal-fluency/fonologia.html','Semántica','Fonológica',NULL,NULL,8,'2024-03-06 22:07:51','2024-07-06 05:39:50'),(9,'Span Verbal',NULL,NULL,1,30,6,'tests/modulo1/digit-span/forward.html','tests/modulo1/digit-span/backward.html','Directo','Inverso',NULL,NULL,7,'2024-03-06 18:25:18','2024-06-17 18:38:25'),(10,'Span Visuoespacial','Cubos de Corsi',NULL,1,50,6,'tests/modulo1/corsi/forward/index.html','tests/modulo1/corsi/backward/index.html','Directo','Inverso',NULL,NULL,6,'2024-03-01 23:46:13','2024-06-17 18:35:52'),(11,'SET',NULL,NULL,1,60,6,'tests/modulo1/story-based/index.html',NULL,'Iniciar','',NULL,NULL,11,'2024-03-19 00:10:56','2024-05-06 20:00:47'),(12,'Reconocimiento de Emociones Faciales ','Reconocimiento facial de expresión emocional',NULL,1,35,4,'tests/modulo1/facial-emotion/index.html',NULL,'Iniciar','',NULL,NULL,10,'2024-03-14 21:43:58','2024-04-16 02:38:11'),(13,'VIENNA',NULL,NULL,1,20,14,'tests/modulo1/vienna/index.html',NULL,'Iniciar','',NULL,NULL,4,'2024-03-01 00:15:36','2024-06-24 22:16:39'),(14,'GFMT2-Low',NULL,NULL,1,40,5,'tests/modulo1/glasgow/index.html',NULL,'Iniciar','',NULL,NULL,5,'2024-02-07 17:23:32','2024-06-17 18:39:26'),(15,'Discriminación Perceptual',NULL,NULL,1,20,11,'tests/modulo1/metacognition/index.html',NULL,'Iniciar','',NULL,NULL,1,'2024-02-29 23:06:08','2024-02-29 23:06:08'),(16,'Dos Máquinas Tragamonedas',NULL,NULL,1,50,4,'tests/modulo1/decision-making/index.html',NULL,'Iniciar','',NULL,NULL,2,'2024-02-07 17:20:21','2024-06-26 20:46:07'),(17,'Pantomima del Uso de Objetos','Pantomima del uso de objetos',NULL,1,20,5,'tests/modulo1/pantomime/index.html',NULL,'Iniciar','',NULL,NULL,16,'2024-05-28 21:14:47','2024-05-28 21:14:47'),(18,'Comprehensive Aphasia Test','Test Exhaustivo de Afasia',NULL,0,20,5,'tests/modulo2/run.html',NULL,'Iniciar','',NULL,NULL,19,'2026-02-13 17:15:28','2026-02-13 17:15:28'),(19,'Disección de líneas','Disección de líneas','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quos! Voluptate iure ipsam ut numquam nihil, sit sint unde enim. Magnam nulla blanditiis a! Ipsum at fugit quidem. Distinctio, eaque!',2,0,10,'tests/modulo2/run.html?part=1',NULL,'Iniciar',NULL,NULL,NULL,19,NULL,'2026-03-11 07:28:42'),(20,'Memoria semántica','Memoria semántica','ssssssss',2,0,10,'tests/modulo2/run.html?part=2',NULL,'Iniciar',NULL,NULL,NULL,19,NULL,'2026-03-11 07:28:48'),(21,'Memoria semántica','Fluidez verbal','dqwe',2,0,10,'tests/modulo2/run.html?part=3',NULL,'Iniciar',NULL,NULL,NULL,19,NULL,'2026-03-11 07:28:56'),(22,'Memoria semántica','Memoria a corto plazo',NULL,2,0,10,'tests/modulo2/run.html?part=4',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(23,'Pantomima','Pantomima',NULL,2,0,10,'tests/modulo2/run.html?part=5',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(24,'Cálculo','Cálculo',NULL,2,0,10,'tests/modulo2/run.html?part=6',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(25,'Descripción escrita de una imagen','Comprensión oral de palabras aisladas',NULL,2,0,10,'tests/modulo2/run.html?part=7',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(26,'Comprensión oral de palabras aisladas','Comprensión escrita de palabras aisladas',NULL,2,0,10,'tests/modulo2/run.html?part=8',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(27,'Comprensión oral de oraciones','Comprensión oral de oraciones',NULL,2,0,10,'tests/modulo2/run.html?part=9',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(28,'Comprensión escrita de oraciones','Comprensión escrita de oraciones',NULL,2,0,10,'tests/modulo2/run.html?part=10',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(29,'Comprensión oral de párrafos','Comprensión oral de párrafos',NULL,2,0,10,'tests/modulo2/run.html?part=11',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(30,'Repetición de palabras','Repetición de palabras',NULL,2,0,10,'tests/modulo2/run.html?part=12',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(31,'Repetición de palabras complejas','Repetición de palabras complejas',NULL,2,0,10,'tests/modulo2/run.html?part=13',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(32,'Repetición de no-palabras','Repetición de no-palabras',NULL,2,0,10,'tests/modulo2/run.html?part=14',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(33,'Repetición de dígitos','Repetición de dígitos',NULL,2,0,10,'tests/modulo2/run.html?part=15',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(34,'Repetición de oraciones','Repetición de oraciones',NULL,2,0,10,'tests/modulo2/run.html?part=16',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(35,'Denominación de objetos','Denominación de objetos',NULL,2,0,10,'tests/modulo2/run.html?part=17',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(36,'Denominación de acciones','Denominación de acciones',NULL,2,0,10,'tests/modulo2/run.html?part=18',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(37,'Descripción oral de una imagen','Descripción oral de una imagen',NULL,2,0,10,'tests/modulo2/run.html?part=19',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(38,'Lectura de palabras aisladas','Lectura de palabras aisladas',NULL,2,0,10,'tests/modulo2/run.html?part=20',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(39,'Lectura de palabras complejas','Lectura de palabras complejas',NULL,2,0,10,'tests/modulo2/run.html?part=21',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(40,'Lectura de palabras funcionales','Lectura de palabras funcionales',NULL,2,0,10,'tests/modulo2/run.html?part=22',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(41,'Lectura de no-palabras','Lectura de no-palabras',NULL,2,0,10,'tests/modulo2/run.html?part=23',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(42,'Copia','Copia',NULL,2,0,10,'tests/modulo2/run.html?part=24',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(43,'Etiquetado de imágenes','Etiquetado de imágenes',NULL,2,0,10,'tests/modulo2/run.html?part=25',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(44,'Escritura al dictado','Escritura al dictado',NULL,2,0,10,'tests/modulo2/run.html?part=26',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(45,'Descripción escrita de una imagen','Descripción escrita de una imagen',NULL,2,0,10,'tests/modulo2/run.html?part=27',NULL,'Iniciar','',NULL,NULL,19,NULL,NULL),(46,'Procesos Motores Basicos','Procesos Motores Basicos','Incluye Evaluacion Orofacial y Evaluacion Integrada de la Respiracion, la Fonacion y la Resonancia.',3,0,15,'tests/modulo3/run.html?part=1',NULL,'Abrir parte',NULL,NULL,NULL,19,'2026-04-13 21:25:05','2026-04-13 21:25:05'),(47,'Evaluacion Motora del Habla','Evaluacion Motora del Habla','Incluye volumen creciente, habla automatica, diadococinesia, lectura, diptongos, palabras polisilabicas, palabras con longitud creciente, pseudopalabras, repeticion de frases y lectura de frases.',3,0,30,'tests/modulo3/run.html?part=2',NULL,'Abrir parte',NULL,NULL,NULL,19,'2026-04-13 21:25:05','2026-04-13 21:25:05'),(48,'Habla Conectada','Habla Conectada','Incluye Descripcion de una imagen, Narracion de una historia y Narracion personal.',3,0,20,'tests/modulo3/run.html?part=3',NULL,'Abrir parte',NULL,NULL,NULL,19,'2026-04-13 21:25:05','2026-04-13 21:25:05');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_test`
--

DROP TABLE IF EXISTS `tipo_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_test` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `num_test` int(11) NOT NULL,
  `descripcion_test` text NOT NULL,
  `instruccion_test` text NOT NULL,
  `instrucciones_adicionales` varchar(255) DEFAULT NULL,
  `enlace_descarga` varchar(255) DEFAULT NULL,
  `audio_instruccion` varchar(255) DEFAULT NULL,
  `fuente` varchar(255) DEFAULT NULL,
  `link_fuente` varchar(255) DEFAULT NULL,
  `icono` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `nombre_esp` varchar(255) DEFAULT NULL,
  `implementacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_test`
--

LOCK TABLES `tipo_test` WRITE;
/*!40000 ALTER TABLE `tipo_test` DISABLE KEYS */;
INSERT INTO `tipo_test` VALUES (1,'Discriminación Perceptual',15,'El test de metacognición en discriminación perceptiva tiene como propósito evaluar la capacidad de los individuos para monitorizar y regular su propio proceso cognitivo durante tareas específicas de discriminación perceptiva.','Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',NULL,NULL,'1707315549.mp3','Creación propia','https://github.com/marionrouault/metacognition-task-online','fa-solid fa-code','2024-02-07 17:19:09','2024-04-19 21:12:42','Metacognición','ejecución local'),(2,'Dos Máquinas Tragamonedas',16,'El problema implica un tomador de decisiones (agente) que se enfrenta a la elección entre dos acciones u opciones, cada una asociada con una distribución de recompensas desconocida. El objetivo del tomador de decisiones es aprender cuál acción proporciona la mayor recompensa esperada y utilizar este conocimiento para maximizar las recompensas.','En este experimento verás aparecer dos máquinas tragamonedas en la pantalla y deberás seleccionar una de ellas. Según tus elecciones, puedes ganar puntos.  Algunas máquinas tragamonedas te darán puntos con mayor o menor frecuencia que otras.  Su trabajo es descubrir qué máquina es la mejor para elegir y seleccionarla usando las flechas de su teclado.',NULL,NULL,'1718749333.mp3','Creación propia','https://gitlab.pavlovia.org/cherkasovabbalab/reinforcement-learning-two-armed-bandit','fa-solid fa-code','2024-02-07 17:19:32','2024-06-19 02:22:13','Toma de decisiones','ejecución local'),(3,'Cancelación de Letras A',4,'Los Tareas de Cancelación son pruebas neuropsicológicas diseñadas para evaluar diferentes aspectos de la atención, concentración y funciones ejecutivas. En el contexto de \"Letters & Bells\", estas tareas suelen implicar la búsqueda y marcado de objetivos específicos (como letras o símbolos) entre distracciones.','El test consta de 2 partes, en la primera debes seleccionar todas las campanas que pueda encontrar en la siguiente página.  Use el cursor para seleccionar las campanas ¡y sólo las campanas!,  Cuando crea que ha seleccionado todas las campanas pulse el botón \'validar\'. Para la segunda parte, debes realizar los mismos pasos, pero debes seleccionar todas las letras \'A\' que puedas encontrar en la imagen, trabaje tan rápido como pueda.   ¡Buena Suerte!',NULL,NULL,'1718633274.mp3','Creación propia',NULL,'fa-solid fa-code','2024-02-07 17:19:51','2024-06-17 18:07:54','Test de cancelación','ejecución local'),(4,'VIENNA',13,'La Virtual Environments Navigation Assessment es una herramienta utilizada para evaluar las habilidades de navegación de las personas en entornos virtuales. Estos entornos pueden ser simulaciones de lugares reales, como calles o edificios, o mundos completamente ficticios creados por ordenador.','Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',NULL,NULL,'1707315716.mp3','Creación propia','https://osf.io/kp4c5/','fa-solid fa-code','2024-02-07 17:21:56','2024-04-16 21:24:20',NULL,'ejecución local'),(5,'GFMT2-Low',14,'Es una medida de la capacidad de los participantes para identificar si dos caras son la misma persona o no. Cada pregunta presenta dos imágenes de la misma persona o de dos personas diferentes. Los participantes deben responder a cada par de caras indicando si las dos caras son la misma persona o dos personas diferentes.','En esta prueba, verás imágenes de pares de rostros. Debes decidir si los rostros en cada imagen son iguales o diferentes. Haz clic en el botón correspondiente y luego presiona la flecha para pasar a la siguiente imagen.',NULL,NULL,'1718634466.mp3','Creación propia',NULL,'fa-solid fa-code','2024-02-07 17:22:27','2024-06-17 18:27:46',NULL,'ejecución local'),(6,'Span Visuoespacial',10,'El test de Span Espacial, también conocido como el test de Bloques de Corsi evalúa la memoria de trabajo visoespacial mostrando secuencias de bloques que los participantes deben repetir, hacia adelante en la versión \"forward\" y en orden inverso en la \"backward\".','Este test consta de 2 partes,  Para ambas partes, Se mostrará una secuencia de 2 a 9 cuadrados. Debe Memorizar la secuencia y tocar los cuadrados en la misma secuencia mostrada o en orden inverso, según corresponda, haciendo clic en los cuadrados. Se presentaran dos secuencias en cada longitud (16 secuencias en total) en orden creciente de longitud.  La prueba se terminará cuando se entreguen respuestas incorrectas para ambas secuencias.  La puntuación será el número total de secuencias realizadas correctamente.   ¡Buena Suerte!',NULL,NULL,'1718634192.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-01 00:21:54','2024-06-25 23:22:28',NULL,'ejecución local'),(7,'Span Verbal',9,'El test de Digit Span evalúa la memoria de trabajo auditiva al requerir que los participantes repitan secuencias de dígitos, tanto en el orden original como en el inverso. Este test proporciona información sobre la capacidad de retención de información a corto plazo, la atención y la capacidad de procesamiento auditivo.','Este test consta de 2 partes,  Para ambas partes, le voy a pedir que me repita unos números. Espere hasta que termine de decir los números y después me los repite en el mismo orden o en orden inverso segun corresponda. Por ejemplo, en la primera parte del test, si digo 1-8-7, usted me dice 1-8-7.  En la segunda parte, deberá repetir los números en orden inverso Por ejemplo, si yo le digo 3-7-4, usted me dice 4-7-3.  ¡Buena Suerte!',NULL,NULL,'1718633899.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-06 18:24:31','2024-06-17 18:18:19','Test de memoria','ejecución local'),(8,'Fluidez Verbal',8,'El test de fluidez verbal mide la capacidad para generar palabras bajo ciertas restricciones en un periodo limitado, como nombrar animales o palabras que comienzan con una letra específica. Evalúa funciones ejecutivas, acceso al léxico y flexibilidad cognitiva. Se utiliza en diagnósticos neuropsicológicos para identificar problemas en áreas cerebrales asociadas al lenguaje y la memoria.','El test se divide en 2 etapas: Prueba Fonológica y Fluidez de Categorías. En este test, deberá reproducir un audio con las instrucciones de cada ítem. Su tarea es decir palabras que comiencen con la letra solicitada o palabras respecto a una categoría solicitada. Sus respuestas serán grabadas, para esto deberá presionar el botón comenzar grabación, tendrá 60 segundos para cada tarea. Cada grabación puede ser descargada',NULL,NULL,'1718632404.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-06 22:06:48','2024-06-17 17:54:34','Fluidez verbal','ejecución local'),(9,'TMT',2,'El Test Trail Making Task evalúa la atención visual, velocidad de procesamiento, y flexibilidad cognitiva al pedir a los participantes que conecten una secuencia de números (Parte A) o números y letras alternadamente (Parte B) lo más rápido posible. Este test se utiliza para detectar disfunciones cerebrales y deterioro cognitivo. Es ampliamente usado en evaluaciones neuropsicológicas para medir la capacidad de cambio de tarea y el procesamiento visual-espacial.','En este test hay 2 partes. La primera es la Parte A, en esta parte habrán números dentro de unos círculos. Haga una línea de un número a otro, en orden. Empiece en el 1, luego vaya al 2, luego vaya al 3, y así sucesivamente. Por favor, trate de hacer una sola línea de un número a otro. La parte B, tendrá números y letras, los cuales deberá unir en orden. Empiece en el 1, luego vaya a la A, luego vaya al 2, y así sucesivamente.  Trabaje lo más rápido que pueda. Partiremos por la muestra A.',NULL,NULL,'1718632841.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-06 22:15:17','2024-06-17 18:00:41',NULL,'ejecución local'),(10,'Reconocimiento de Emociones Faciales ',12,'El test Facial Emotion Recognition (from mini-SEA) es una evaluación breve diseñada para medir la capacidad de reconocimiento de emociones faciales en individuos. Utiliza imágenes de rostros con expresiones emocionales para evaluar la habilidad de una persona para identificar y comprender diferentes emociones a través de señales faciales.','A continuacion se presentarán imagenes de caras. Se mostrarán una por una, las cuales expresan distintas emociónes, tales como: alegría, sorpresa, tristeza, miedo, asco, rabia o neutro cuando ninguna emoción es expresada, debe mirar cada cara atentamente y seleccionar que emoción está expresada sobre la cara. No es un test de rapidez, pero trate de ser relativamente rápido.',NULL,NULL,'1718634495.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-14 21:40:39','2024-06-17 18:28:15',NULL,'ejecución local'),(11,'SET',11,'El test de Story based empathy es una evaluación psicométrica que busca medir la capacidad de una persona para comprender y experimentar las emociones y perspectivas de los demás a través de historias o situaciones narrativas. Se basa en la capacidad del individuo para identificarse con los personajes y entender sus sentimientos, lo que proporciona información sobre su nivel de empatía y habilidades sociales.','A continuacion verás una historia representada en tres dibujos animados. Tu tarea es describir lo que les sucede a los personajes e intentar imaginar un posible final. Luego te mostraremos tres posibles finales y tu tarea será elegir el correcto para terminar la historia.',NULL,NULL,'1718634595.mp3','Creación propia',NULL,'fa-solid fa-code','2024-03-19 00:10:15','2024-06-17 18:29:55',NULL,'ejecución local'),(12,'mCCT',7,'El Modified Camel and Cactus Test (MCCT) presenta una imagen en la parte superior de la pantalla y cuatro imágenes en la parte inferior. Los participantes deben seleccionar la imagen que mejor se empareje con la imagen superior. Esta prueba evalúa habilidades cognitivas como la atención, la percepción visual, la memoria de trabajo y la flexibilidad cognitiva.','Se mostrarán 5 imágenes en la pantalla: una en la parte superior, y 4 en la parte inferior.  Debe elegir cuál de las 4 imágenes de la parte inferior se empareja mejor con la imagen en la parte superior. Use el ratón del ordenador para clicar sobre la imagen.  Habrán 3 ítems de practica y luego se comienza con el test.',NULL,NULL,'1718634381.mp3','Creación propia',NULL,'fa-solid fa-code','2024-04-10 01:29:19','2024-06-17 18:26:21',NULL,'ejecución local'),(13,'VOSP Number Location',5,'El VOSP Number Location Test evalúa la habilidad de ubicar y recordar números en un patrón de rejilla. Los participantes deben identificar y recordar la ubicación de los números presentados en una cuadrícula desordenada. Esta prueba evalúa la atención selectiva, la memoria visual y la capacidad de procesamiento visuoespacial.','Uno de los números del cuadrado corresponde con la posición del punto en el cuadrado, debe decir el número que coincide con la posición del punto. En la práctica 1 y 2, se le mostrará la retroalimentación de su respuesta antes de pasar a la siguiente tarjeta.',NULL,NULL,'1718634435.mp3','Creación propia',NULL,'fa-solid fa-code','2024-04-10 01:33:21','2024-06-17 18:27:15',NULL,'ejecución local'),(15,'Figura Compleja de Benson',6,'El test de la figura compleja de Benson evalúa las habilidades visoespaciales y de memoria a través de dos tareas: copiar una figura compleja y, posteriormente, recordar y dibujar la figura sin verla. Es una herramienta usada en la evaluación neuropsicológica para detectar déficits cognitivos relacionados con funciones ejecutivas y memoria visual','Este test consta de tres partes:  1-Copiar la Figura: Se presentará una figura, la cual debe copiar lo más exacta posible. 2- Recuerdo Diferido: Pasado un tiempo, deberá dibujar la misma figura de memoria, sin ayudas 3-Identificar figura: Se presentará una sección para identificar la figura dibujada.',NULL,NULL,'1718634248.mp3','Creación propia',NULL,'fa-solid fa-code','2024-05-28 21:09:29','2024-06-17 18:24:08','Figura compleja de Benson','ejecución local'),(16,'Pantomima del Uso de Objetos',17,'La tarea de pantomima evalúa la habilidad de una persona para representar acciones o usar objetos sin hablar ni utilizar los objetos reales, imitando su uso. Se utiliza en neuropsicología para evaluar la praxis, que es la capacidad de planificar y ejecutar movimientos coordinados. Este test ayuda a identificar problemas en el control motor y la representación simbólica de acciones.','En esta prueba, quiero que imagine que sostiene el objeto que le voy a mostrar a continuación en su mano. Es importante que recuerde no usar su mano o dedos como si fuese el objeto. Use los botones para grabar y detener la grabación.',NULL,NULL,'1718634645.mp3','Creación propia',NULL,'fa-solid fa-code','2024-05-28 21:13:04','2024-06-17 18:30:45','Test de pantomima','ejecución local'),(17,'D-KEFS Design Fluency',3,'El test de Fluidez de Diseño evalúa la capacidad creativa y ejecutiva del individuo a través de la generación de patrones o figuras abstractas en un tiempo limitado. Los participantes deben crear tantos diseños únicos como puedan en un tiempo determinado, sin repetir formas o usar símbolos familiares. Esta prueba mide funciones ejecutivas, habilidades visuoespaciales y pensamiento divergente.','En este test, debes unir todos los puntos en cada uno de los cuadros de la imagen. Usa el mouse para dibujar líneas entre los puntos. Debes dibujar tantos diseños diferentes como pueda hasta que le diga que pare. Recuerde usar solo cuatro líneas rectas para conectar los puntos. Trabaje lo más rápido que puedas y trate que cada diseño sea diferente.',NULL,NULL,'1718749496.mp3','Creación propia',NULL,'fa-solid fa-code','2024-06-19 02:24:56','2024-06-19 02:24:56','Fluidez de Diseño','ejecución local'),(18,'HVLT-R',1,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quos! Voluptate iure ipsam ut numquam nihil, sit sint unde enim. Magnam nulla blanditiis a! Ipsum at fugit quidem. Distinctio, eaque!','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quos! Voluptate iure ipsam ut numquam nihil, sit sint unde enim. Magnam nulla blanditiis a! Ipsum at fugit quidem. Distinctio, eaque!',NULL,NULL,'1722272096.mp3','Creación propia','','fa-solid fa-code','2024-07-29 20:54:56','2024-07-29 23:04:43','HVLT-R','ejecución local'),(19,'Test Exhaustivo de Afasia',18,'aaab','aaa',NULL,NULL,NULL,'Creación propia',NULL,'fa-solid fa-code','2026-02-13 20:13:49','2026-02-13 20:13:49',NULL,'Ejecucion local');
/*!40000 ALTER TABLE `tipo_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Ejemplo','admin@ejemplo.com',NULL,'$2y$10$8noAUwMlRrqYzbfkBvzGruxLg00I5LArisQemjvYFtSrN1kZ7nagu','cWJFuzt1xl4FHvfbhv4GeSmzroiRQo5KhctNG4pPbRyhtN0MqajVcOC2IA6s','2024-02-10 00:41:35','2024-12-18 05:56:27'),(2,'examinador','prueba','prueba@ejemplo.com',NULL,'$2y$10$NBdlfDiMZ1ZQuYGd1UCLMe0leFfIia1UKlyKfE4.Q5cqm5JJvWFpe',NULL,'2024-02-27 21:11:35','2024-12-18 05:56:45'),(20,'Diego','Lorca','usuario@ejemplo.com',NULL,'$2y$10$jg4kvz4MWBYkR5jLeWULM.Tu8pG31V208fG71SQM5UM13FjPfZmIK',NULL,'2024-03-11 05:34:01','2024-12-18 05:56:56'),(23,'visitante','Visitante','visitante@ejemplo.com',NULL,'$2y$10$rUwCL9XoyJpwh05WaSuL9OBqWF602odua.4wry/r8/i7MRgXiypN2',NULL,'2024-03-19 21:56:47','2024-12-18 05:57:12'),(24,'Pablo','Monjes','pmonjes@ing.ucsc.cl',NULL,'$2y$10$vHz7P17OuEle3Pcfl1R5Qe/EuFRe0811uEzxLPWU3XHULTS..JD.K',NULL,'2024-12-12 05:45:10','2024-12-18 05:57:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'neurotest'
--

--
-- Dumping routines for database 'neurotest'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-13 17:33:45
