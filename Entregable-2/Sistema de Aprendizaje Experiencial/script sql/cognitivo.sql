-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: cognitivo
-- ------------------------------------------------------
-- Server version	5.7.14-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `id_rut` varchar(15) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rut`,`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES ('18744233-1','admin@admin.cl','jose','pinto','123456','2016-11-06 20:55:16');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `id_rol` varchar(15) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `clasificacion` int(11) NOT NULL DEFAULT '0',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rol`,`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES ('201153240-1','simon.sintreras@sansano.usm.cl','Simon','Sintreras','i15ah5mi',0,'2016-10-24 09:31:18'),('201323503-4','simon.contreras.13@sansano.usm.cl','Simón','Contreras','qwerty',0,'2016-09-11 15:50:25'),('201373540-1','francisco.garciam.13@sansano.usm.cl','Francisco','García','password123',1,'2016-09-11 15:50:58'),('201373550-4','juan.ignacio.13@sansano.usm.cl','Juan','Ignacio','123456',0,'2016-10-22 17:19:16');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno_has_asignatura`
--

DROP TABLE IF EXISTS `alumno_has_asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno_has_asignatura` (
  `alumno_id_alumno` varchar(15) NOT NULL,
  `alumno_correo` varchar(100) NOT NULL,
  `asignatura_id_sigla` varchar(10) NOT NULL,
  KEY `fk_alumno_has_asignatura_asignatura1_idx` (`asignatura_id_sigla`),
  KEY `fk_alumno_has_asignatura_alumno1_idx` (`alumno_id_alumno`,`alumno_correo`),
  CONSTRAINT `fk_alumno_has_asignatura_alumno1` FOREIGN KEY (`alumno_id_alumno`, `alumno_correo`) REFERENCES `alumno` (`id_rol`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_alumno_has_asignatura_asignatura1` FOREIGN KEY (`asignatura_id_sigla`) REFERENCES `asignatura` (`id_sigla`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno_has_asignatura`
--

LOCK TABLES `alumno_has_asignatura` WRITE;
/*!40000 ALTER TABLE `alumno_has_asignatura` DISABLE KEYS */;
INSERT INTO `alumno_has_asignatura` VALUES ('201323503-4','simon.contreras.13@sansano.usm.cl','FIS-120'),('201323503-4','simon.contreras.13@sansano.usm.cl','FIS-130'),('201323503-4','simon.contreras.13@sansano.usm.cl','FIS-140'),('201373540-1','francisco.garciam.13@sansano.usm.cl','FIS-130'),('201373540-1','francisco.garciam.13@sansano.usm.cl','FIS-120');
/*!40000 ALTER TABLE `alumno_has_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura` (
  `id_sigla` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `inscritos` int(11) NOT NULL DEFAULT '0',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(400) DEFAULT 'Descripción vacía.',
  PRIMARY KEY (`id_sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES ('FIS-120','Física General 120',51,'2016-09-11 15:30:56','Ramo de Electromagnetismo, circuitos, etc.'),('FIS-130','Física General 130',81,'2016-09-11 10:40:36','Oscilaciones, Fluidos,etc.'),('FIS-140','Física General 140',101,'2016-09-11 10:45:36','Fisica relativista, optica y fisica cuantica.');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura_has_profesor`
--

DROP TABLE IF EXISTS `asignatura_has_profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura_has_profesor` (
  `asignatura_id_sigla` varchar(10) NOT NULL,
  `profesor_id_rut` varchar(15) NOT NULL,
  `profesor_correo` varchar(100) NOT NULL,
  PRIMARY KEY (`asignatura_id_sigla`,`profesor_id_rut`,`profesor_correo`),
  KEY `fk_asignatura_has_profesor_profesor1_idx` (`profesor_id_rut`,`profesor_correo`),
  KEY `fk_asignatura_has_profesor_asignatura1_idx` (`asignatura_id_sigla`),
  CONSTRAINT `fk_asignatura_has_profesor_asignatura1` FOREIGN KEY (`asignatura_id_sigla`) REFERENCES `asignatura` (`id_sigla`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asignatura_has_profesor_profesor1` FOREIGN KEY (`profesor_id_rut`, `profesor_correo`) REFERENCES `profesor` (`id_rut`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura_has_profesor`
--

LOCK TABLES `asignatura_has_profesor` WRITE;
/*!40000 ALTER TABLE `asignatura_has_profesor` DISABLE KEYS */;
INSERT INTO `asignatura_has_profesor` VALUES ('FIS-120','12345678-9','profesor.fisica@usm.cl');
/*!40000 ALTER TABLE `asignatura_has_profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeback`
--

DROP TABLE IF EXISTS `feeback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeback` (
  `id_feeback` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  `comentario` varchar(400) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `alumno_id_alumno` varchar(15) NOT NULL,
  `alumno_correo` varchar(100) NOT NULL,
  `subunidad_id_subunidad` int(11) NOT NULL,
  PRIMARY KEY (`id_feeback`,`alumno_id_alumno`,`alumno_correo`,`subunidad_id_subunidad`),
  KEY `fk_feeback_alumno1_idx` (`alumno_id_alumno`,`alumno_correo`),
  KEY `fk_feeback_subunidad1_idx` (`subunidad_id_subunidad`),
  CONSTRAINT `fk_feeback_alumno1` FOREIGN KEY (`alumno_id_alumno`, `alumno_correo`) REFERENCES `alumno` (`id_rol`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_feeback_subunidad1` FOREIGN KEY (`subunidad_id_subunidad`) REFERENCES `subunidad` (`id_subunidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeback`
--

LOCK TABLES `feeback` WRITE;
/*!40000 ALTER TABLE `feeback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feeback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacion`
--

DROP TABLE IF EXISTS `informacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `informacion` (
  `id_informacion` int(11) NOT NULL AUTO_INCREMENT,
  `formato` varchar(45) NOT NULL,
  `data` longblob,
  `linkRuta` varchar(500) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT 'Sin titulo',
  `info` varchar(1000) DEFAULT 'Sin información',
  `clasificacion` int(11) NOT NULL DEFAULT '0',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profesor_id_rut` varchar(15) NOT NULL,
  `profesor_correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_informacion`,`profesor_id_rut`,`profesor_correo`),
  KEY `fk_informacion_profesor1_idx` (`profesor_id_rut`,`profesor_correo`),
  CONSTRAINT `fk_informacion_profesor1` FOREIGN KEY (`profesor_id_rut`, `profesor_correo`) REFERENCES `profesor` (`id_rut`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacion`
--

LOCK TABLES `informacion` WRITE;
/*!40000 ALTER TABLE `informacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `informacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacion_has_subunidad`
--

DROP TABLE IF EXISTS `informacion_has_subunidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `informacion_has_subunidad` (
  `informacion_id_informacion` int(11) NOT NULL,
  `subunidad_id_subunidad` int(11) NOT NULL,
  PRIMARY KEY (`informacion_id_informacion`,`subunidad_id_subunidad`),
  KEY `fk_informacion_has_subunidad_subunidad1_idx` (`subunidad_id_subunidad`),
  KEY `fk_informacion_has_subunidad_informacion1_idx` (`informacion_id_informacion`),
  CONSTRAINT `fk_informacion_has_subunidad_informacion1` FOREIGN KEY (`informacion_id_informacion`) REFERENCES `informacion` (`id_informacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_informacion_has_subunidad_subunidad1` FOREIGN KEY (`subunidad_id_subunidad`) REFERENCES `subunidad` (`id_subunidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacion_has_subunidad`
--

LOCK TABLES `informacion_has_subunidad` WRITE;
/*!40000 ALTER TABLE `informacion_has_subunidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `informacion_has_subunidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `id_rut` varchar(15) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rut`,`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES ('12345678-9','profesor.fisica@usm.cl','Profesor','Fisica','password1234','2016-09-11 15:37:07'),('18923122-5','profe.fisica@usm.cl','a','Bahamondes','f2xlmcxr','2016-10-23 21:03:54'),('18955211-5','Juan.Bahamondes@usm.cl','Juan','Bahamondes','123456','2016-10-22 17:39:35');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subunidad`
--

DROP TABLE IF EXISTS `subunidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subunidad` (
  `id_subunidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(400) DEFAULT 'descripción vacía.',
  `fecha_creación` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unidad_id_unidad` int(11) NOT NULL,
  `numero_subunidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_subunidad`,`unidad_id_unidad`),
  KEY `fk_subunidad_unidad1_idx` (`unidad_id_unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunidad`
--

LOCK TABLES `subunidad` WRITE;
/*!40000 ALTER TABLE `subunidad` DISABLE KEYS */;
INSERT INTO `subunidad` VALUES (6,'Pendulo Simple','material pendulo simple','2016-09-11 15:47:50',2,0),(7,'Pendulo Compuesto','material pendulo compuesto','2016-11-05 17:52:27',2,1);
/*!40000 ALTER TABLE `subunidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidad` (
  `id_unidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(400) DEFAULT 'descripción vacía',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `asignatura_id_sigla` varchar(10) NOT NULL,
  `profesor_id_rut` varchar(15) NOT NULL,
  `profesor_correo` varchar(100) NOT NULL,
  `numero_unidad` int(11) NOT NULL,
  PRIMARY KEY (`id_unidad`,`asignatura_id_sigla`,`profesor_id_rut`,`profesor_correo`),
  KEY `fk_unidad_asignatura1_idx` (`asignatura_id_sigla`),
  KEY `fk_unidad_profesor1_idx` (`profesor_id_rut`,`profesor_correo`),
  CONSTRAINT `fk_unidad_asignatura1` FOREIGN KEY (`asignatura_id_sigla`) REFERENCES `asignatura` (`id_sigla`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_unidad_profesor1` FOREIGN KEY (`profesor_id_rut`, `profesor_correo`) REFERENCES `profesor` (`id_rut`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,'Termodinamica','Unidad de Termodinamica','2016-10-23 15:02:31','FIS-130','12345678-9','profesor.fisica@usm.cl',3),(2,'Ondas','Unidad de Ondas','2016-10-23 15:02:31','FIS-130','12345678-9','profesor.fisica@usm.cl',1),(3,'Fluidos','Unidad De Fluidos','2016-10-23 15:02:31','FIS-130','12345678-9','profesor.fisica@usm.cl',2),(7,'Campo magnético','Unidad de campo magnético','2016-09-11 15:40:26','FIS-120','12345678-9','profesor.fisica@usm.cl',1);
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ver_alumnos`
--

DROP TABLE IF EXISTS `ver_alumnos`;
/*!50001 DROP VIEW IF EXISTS `ver_alumnos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ver_alumnos` AS SELECT 
 1 AS `id_rol`,
 1 AS `correo`,
 1 AS `nombre`,
 1 AS `apellido`,
 1 AS `contraseña`,
 1 AS `clasificacion`,
 1 AS `fecha_creacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vista`
--

DROP TABLE IF EXISTS `vista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vista` (
  `id_vista` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `alumno_id_alumno` varchar(15) NOT NULL,
  `alumno_correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_vista`,`alumno_id_alumno`,`alumno_correo`),
  KEY `fk_vista_alumno_idx` (`alumno_id_alumno`,`alumno_correo`),
  CONSTRAINT `fk_vista_alumno` FOREIGN KEY (`alumno_id_alumno`, `alumno_correo`) REFERENCES `alumno` (`id_rol`, `correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vista`
--

LOCK TABLES `vista` WRITE;
/*!40000 ALTER TABLE `vista` DISABLE KEYS */;
/*!40000 ALTER TABLE `vista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vista_has_subunidad`
--

DROP TABLE IF EXISTS `vista_has_subunidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vista_has_subunidad` (
  `vista_id_vista` int(11) NOT NULL,
  `subunidad_id_subunidad` int(11) NOT NULL,
  PRIMARY KEY (`vista_id_vista`,`subunidad_id_subunidad`),
  KEY `fk_vista_has_subunidad_vista1_idx` (`vista_id_vista`),
  KEY `fk_vista_has_subunidad_subunidad1_idx` (`subunidad_id_subunidad`),
  CONSTRAINT `fk_vista_has_subunidad_subunidad1` FOREIGN KEY (`subunidad_id_subunidad`) REFERENCES `subunidad` (`id_subunidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vista_has_subunidad_vista1` FOREIGN KEY (`vista_id_vista`) REFERENCES `vista` (`id_vista`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vista_has_subunidad`
--

LOCK TABLES `vista_has_subunidad` WRITE;
/*!40000 ALTER TABLE `vista_has_subunidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `vista_has_subunidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cognitivo'
--
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_alumno`(cod int, rol varchar(45), nuevo varchar(100))
BEGIN
if (cod = 1) then
	update alumno set nombre = nuevo where id_rol = rol;
elseif (cod = 2) then
	update alumno set apellido = nuevo where id_rol = rol;
elseif (cod = 3) then
	update alumno set correo = nuevo where id_rol = rol;
elseif (cod = 4) then
	update alumno set contraseña = nuevo where id_rol = rol;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_asignatura`(atributo varchar(45) , sigla_id varchar(10), nuevo_valor varchar(400))
BEGIN
if (atributo = 'nombre') then
	update asignatura set nombre = nuevo_valor where id_sigla = sigla_id;
elseif (atributo = 'descripcion') then
	update asignatura set descripcion = nuevo_valor where id_sigla = sigla_id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_feedback` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_feedback`(atributo varchar(45) , feedback_id int(11), nuevo_valor varchar(400))
BEGIN
if (atributo = 'tipo') then
	update feeback set tipo = nuevo_valor where id_feeback = feedback_id;
elseif (atributo = 'nombre') then
	update feeback set nombre = nuevo_valor where id_feeback = feedback_id;
elseif (atributo = 'comentario') then
	update feeback set comentario = nuevo_valor where id_feeback = feedback_id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_informacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_informacion`(atributo varchar(45) , informacion_id int(11), nuevo_valor varchar(400))
BEGIN
if (atributo = 'formato') then
	update informacion set formato = nuevo_valor where id_informacion = informacion_id;
elseif (atributo = 'link') then
	update informacion set link = nuevo_valor where id_informacion = informacion_id;
elseif (atributo = 'descripcion') then
	update informacion set descripcion = nuevo_valor where id_informacion = informacion_id;
elseif (atributo = 'clasificacion') then
	update informacion set clasificacion = nuevo_valor where id_informacion = informacion_id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_profesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_profesor`(cod int, rut varchar(45), nuevo varchar(100))
BEGIN
if (cod = 1) then
	update profesor set nombre = nuevo where id_rut = rut;
elseif (cod = 2) then
	update profesor set apellido = nuevo where id_rut = rut;
elseif (cod = 3) then
	update profesor set correo = nuevo where id_rut = rut;
elseif (cod = 4) then
	update profesor set contraseña = nuevo where id_rut = rut;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_subunidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_subunidad`(atributo varchar(45) , subunidad_id int(11), nuevo_valor varchar(400))
BEGIN
if (atributo = 'nombre') then
	update subunidad set nombre = nuevo_valor where id_subunidad = subunidad_id;
elseif (atributo = 'descripcion') then
	update subunidad set descripcion = nuevo_valor where id_subunidad = subunidad_id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_info_unidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_info_unidad`(atributo varchar(45) , unidad_id int(11), nuevo_valor varchar(400))
BEGIN
if (atributo = 'nombre') then
	update unidad set nombre = nuevo_valor where id_unidad = unidad_id;
elseif (atributo = 'descripcion') then
	update unidad set descripcion = nuevo_valor where id_unidad = unidad_id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `asignar_informacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `asignar_informacion`(informacion_id int(11), subunidad_id int(11))
BEGIN
insert into informacion_has_subunidad values(informacion_id, subunidad_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `asignar_vista` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `asignar_vista`(vista_id int(11), subunidad_id int(11))
BEGIN

insert into vista_has_subunidad values (vista_id, subunidad_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clasificar_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clasificar_alumno`(rol varchar(15), tipo int)
BEGIN
update alumno set clasificacion = tipo where id_rol = rol;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crear_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_asignatura`(sigla varchar(10), nombre varchar(100), descripcion varchar(400))
BEGIN
insert into asignatura (id_sigla, nombre, descripcion) values (sigla, nombre, descripcion);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crear_feedback` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_feedback`(tipo varchar(45), comentario varchar(45), subunidad_id int(11), rol varchar(15))
BEGIN
select @correo := correo from alumno where id_rol = rol;
insert into feeback values (tipo,comentario,alumno_id_alumno, alumno_correo,subunidad_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crear_subunidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_subunidad`(nombre varchar(100), descripcion varchar(400), unidad_id varchar(15))
BEGIN
insert into subunidad (nombre, descripcion, unidad_id_unidad)  
values (nombre,descripcion,unidad_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crear_unidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_unidad`(nombre varchar(100), descripcion varchar(400),id_profesor varchar(15), id_asignatura varchar(10))
BEGIN
select @correo_profesor := correo from profesor where id_rut = id_profesor;
insert into unidad (nombre,descripcion,asignatura_id_sigla, profesor_id_rut, profesor_correo)  
values (nombre,descripcion,id_asignatura, id_profesor, @correo_profesor);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crear_vista` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_vista`(nombre varchar(45), rol_id varchar(15))
BEGIN
select @correo := correo from alumno where id_rol = rol_id;
insert into vista (nombre,alumno_id_alumno, alumno_correo) values (nombre, rol_id,@correo);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `desinscribir_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `desinscribir_asignatura`(rol varchar(15), sigla varchar(10))
BEGIN
delete from alumno_has_asignatura where (sigla = asignatura_id_sigla and alumno_id_alumno = rol);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_alumno`(rol varchar(15))
BEGIN
delete from alumno where id_rol = rol;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_asignatura`(sigla varchar(10))
BEGIN
delete from asignatura where id_sigla = sigla;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_feedback` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_feedback`(feedback_id INT(11))
BEGIN
delete from feeback where id_feeback = feedback_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_informacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_informacion`(informacion_id int(11))
BEGIN
delete from inforamcion where id_informacion = informacion_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_profesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_profesor`(rut varchar(15))
BEGIN
delete from profesor where id_rut = rut;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_subunidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_subunidad`(subunidad_id int(11))
BEGIN
delete from subunidad where id_subunidad = subunidad_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_unidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_unidad`(unidad_id INT(11))
BEGIN
delete from unidad where id_unidad = unidad_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inscribir_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inscribir_asignatura`(rol varchar(15), sigla varchar(10))
BEGIN
select @id := id_rol from alumno where id_rol = rol;
select @corr := correo from alumno where id_rol = rol;
select @sg := id_sigla from asignatura where id_sigla = sigla;
insert into alumno_has_asignatura values (@id, @corr, @sg);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inscribir_asignatura_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inscribir_asignatura_alumno`(rol varchar(15), sigla varchar(10))
BEGIN
select @id := id_rol from alumno where id_rol = rol;
select @corr := correo from alumno where id_rol = rol;
select @sg := id_sigla from asignatura where id_sigla = sigla;
insert into alumno_has_asignatura values (@id, @corr, @sg);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inscribir_asignatura_profesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inscribir_asignatura_profesor`(rut varchar(15), sigla varchar(10))
BEGIN
select @id := id_rut from profesor where id_rut = rut;
select @corr := correo from profesor where id_rut = rut;
select @sg := id_sigla from asignatura where id_sigla = sigla;
insert into asignatura_has_profesor values (@sg, @id, @corr);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mostrar_info_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar_info_alumno`(rol varchar(15))
BEGIN
select * from alumno where id_rol = rol;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mostrar_info_asignatura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar_info_asignatura`(sigla varchar(10))
BEGIN
select *from asignatura where id_sigla = sigla;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mostrar_info_profesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar_info_profesor`(rut varchar(15))
BEGIN
select * from profesor where id_rut = rut;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrar_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_alumno`(rol varchar(15), correo varchar(100), nombre varchar(45), 
apellido varchar(45), contraseña varchar(100))
BEGIN
INSERT INTO alumno (id_rol, nombre, apellido, correo, contraseña) VALUES (rol, nombre, apellido, correo, contraseña);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrar_profesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_profesor`(rut varchar(15), correo varchar(100),nombre varchar(45),
 apellido varchar(45), contraseña varchar(100))
BEGIN
insert into profesor (id_rut, correo, nombre, apellido, contraseña) values (rut,correo,nombre,apellido,contraseña);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_informacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_informacion`(formato varchar(45), data LONGBLOB,link varchar(500),
clasificacion int, descripcion varchar(400), id_profesor VARCHAR(15))
BEGIN
select @correo_profesor :=  correo from profesor where id_rut = id_profesor;
insert into informacion (formato, data, link, descripcion, clasificacion) values (formato, data, link, descripcion,
 clasificacion, id_profesor, @correo_profesor);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `ver_alumnos`
--

/*!50001 DROP VIEW IF EXISTS `ver_alumnos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ver_alumnos` AS select `alumno`.`id_rol` AS `id_rol`,`alumno`.`correo` AS `correo`,`alumno`.`nombre` AS `nombre`,`alumno`.`apellido` AS `apellido`,`alumno`.`contraseña` AS `contraseña`,`alumno`.`clasificacion` AS `clasificacion`,`alumno`.`fecha_creacion` AS `fecha_creacion` from `alumno` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-06 21:10:27
