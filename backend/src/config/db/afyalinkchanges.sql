/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: afyalink
-- ------------------------------------------------------
-- Server version	11.8.3-MariaDB-1+b1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `target_table` varchar(100) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `time_stamp` timestamp NULL DEFAULT current_timestamp(),
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `audit_log` VALUES
(1,NULL,'create','users',1,'New user created: Test User (Role: patient)','2025-10-13 14:16:26','2025-10-14 07:02:06'),
(2,NULL,'create','users',3,'New user created: Cyril Imbwaga (Role: patient)','2025-10-13 14:39:40','2025-10-14 07:02:06'),
(3,NULL,'create','users',5,'New user created: John Doe (Role: doctor)','2025-10-13 15:03:59','2025-10-14 07:02:06'),
(4,NULL,'create','users',6,'New user created: Jane Doe (Role: nurse)','2025-10-13 15:13:17','2025-10-14 07:02:06'),
(5,NULL,'create','users',7,'New user created: Judas Iscariot (Role: admin)','2025-10-13 15:19:26','2025-10-14 07:02:06'),
(6,NULL,'update','users',7,'Phone changed from \"+254712945612\" to \"+254712440129\". ','2025-10-14 07:02:10','2025-10-14 07:02:10'),
(7,NULL,'create','users',8,'New user created: John Otieno (Role: nurse)','2025-10-14 07:14:55','2025-10-14 07:14:55'),
(8,NULL,'update','users',8,'Phone changed from \"+254712945612\" to \"+254712345678\". ','2025-10-14 07:22:40','2025-10-14 07:22:40'),
(9,NULL,'create','users',11,'New user created: Ian Otieno (Role: nurse)','2025-10-14 07:26:32','2025-10-14 07:26:32'),
(10,NULL,'create','users',14,'New user created: Beef Wellington (Role: nurse)','2025-10-15 10:11:19','2025-10-15 10:11:19'),
(11,NULL,'create','users',15,'New user created: Beef Wellington (Role: nurse)','2025-10-15 10:19:55','2025-10-15 10:19:55'),
(12,NULL,'create','users',16,'New user created: Beef Wellington (Role: nurse)','2025-10-15 11:16:43','2025-10-15 11:16:43'),
(13,NULL,'create','users',18,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 06:43:49','2025-10-16 06:43:49'),
(14,NULL,'create','users',19,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 06:48:36','2025-10-16 06:48:36'),
(15,NULL,'create','users',20,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 06:59:09','2025-10-16 06:59:09'),
(16,NULL,'create','users',21,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 07:08:38','2025-10-16 07:08:38'),
(17,NULL,'create','users',22,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 07:17:46','2025-10-16 07:17:46'),
(18,NULL,'create','users',23,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 07:19:22','2025-10-16 07:19:22'),
(19,NULL,'create','users',24,'New user created: cyril imbwaga (Role: nurse)','2025-10-16 07:26:17','2025-10-16 07:26:17'),
(20,NULL,'update','users',7,'Email changed from \"judasiscariot@gmail.com\" to \"biggymatope@gmail.com\". ','2025-10-16 08:04:01','2025-10-16 08:04:01'),
(21,NULL,'update','users',24,'Role changed from \"nurse\" to \"assign\". ','2025-10-19 11:56:28','2025-10-19 11:56:28'),
(22,NULL,'update','users',24,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 11:58:40','2025-10-19 11:58:40'),
(23,NULL,'update','users',5,'Role changed from \"doctor\" to \"iadmin\". ','2025-10-19 12:40:26','2025-10-19 12:40:26'),
(24,NULL,'update','users',8,'Role changed from \"nurse\" to \"iadmin\". ','2025-10-19 12:40:26','2025-10-19 12:40:26'),
(25,NULL,'update','users',5,'Role changed from \"iadmin\" to \"nurse\". ','2025-10-19 12:42:14','2025-10-19 12:42:14'),
(26,NULL,'update','users',8,'Role changed from \"iadmin\" to \"nurse\". ','2025-10-19 12:42:14','2025-10-19 12:42:14'),
(27,NULL,'update','users',5,'Role changed from \"nurse\" to \"assign\". ','2025-10-19 12:42:31','2025-10-19 12:42:31'),
(28,NULL,'update','users',8,'Role changed from \"nurse\" to \"assign\". ','2025-10-19 12:42:31','2025-10-19 12:42:31'),
(29,NULL,'update','users',5,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 12:42:35','2025-10-19 12:42:35'),
(30,NULL,'update','users',24,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 13:03:16','2025-10-19 13:03:16'),
(31,NULL,'update','users',24,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 13:06:11','2025-10-19 13:06:11'),
(32,NULL,'update','users',24,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 13:09:10','2025-10-19 13:09:10'),
(33,NULL,'update','users',24,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 13:11:23','2025-10-19 13:11:23'),
(34,NULL,'update','users',5,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 13:27:46','2025-10-19 13:27:46'),
(35,NULL,'update','users',5,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 13:37:54','2025-10-19 13:37:54'),
(36,NULL,'create','users',25,'New user created: Timon Opiyo (Role: doctor)','2025-10-19 13:50:14','2025-10-19 13:50:14'),
(37,NULL,'update','users',25,'Role changed from \"doctor\" to \"iadmin\". ','2025-10-19 13:53:41','2025-10-19 13:53:41'),
(38,NULL,'update','users',25,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 13:53:58','2025-10-19 13:53:58'),
(39,NULL,'update','users',25,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 13:54:41','2025-10-19 13:54:41'),
(40,NULL,'update','users',25,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 13:57:46','2025-10-19 13:57:46'),
(41,NULL,'update','users',25,'Role changed from \"assign\" to \"iadmin\". ','2025-10-19 13:59:26','2025-10-19 13:59:26'),
(42,NULL,'update','users',1,'Role changed from \"patient\" to \"admin\". ','2025-10-19 14:06:42','2025-10-19 14:06:42'),
(43,NULL,'update','users',1,'Role changed from \"admin\" to \"iadmin\". ','2025-10-19 14:09:14','2025-10-19 14:09:14'),
(44,NULL,'update','users',1,'Role changed from \"iadmin\" to \"assign\". ','2025-10-19 14:09:20','2025-10-19 14:09:20'),
(45,NULL,'create','users',26,'New user created: Cyril Imbwaga (Role: refmanagertobe)','2025-10-20 20:57:40','2025-10-20 20:57:40'),
(46,NULL,'update','users',26,'Role changed from \"refmanagertobe\" to \"refmanager\". ','2025-10-20 21:43:04','2025-10-20 21:43:04'),
(47,NULL,'create','users',27,'New user created: Timon Opiyo (Role: doctor)','2025-10-21 20:33:17','2025-10-21 20:33:17'),
(48,NULL,'create','doctors',1,'New doctor record created for user_id 27','2025-10-21 21:09:17','2025-10-21 21:09:17'),
(49,NULL,'update','users',1,'Role changed from \"assign\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(50,NULL,'update','users',6,'Role changed from \"nurse\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(51,NULL,'update','users',7,'Role changed from \"admin\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(52,NULL,'update','users',8,'Role changed from \"assign\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(53,NULL,'update','users',11,'Role changed from \"nurse\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(54,NULL,'update','users',26,'Role changed from \"refmanager\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(55,NULL,'update','users',27,'Role changed from \"doctor\" to \"refmanagertobe\". ','2025-10-24 13:34:56','2025-10-24 13:34:56'),
(56,NULL,'update','users',7,'Role changed from \"refmanagertobe\" to \"admin\". ','2025-10-24 13:36:09','2025-10-24 13:36:09'),
(57,NULL,'update','users',27,'Role changed from \"refmanagertobe\" to \"doctor\". ','2025-10-24 13:36:39','2025-10-24 13:36:39'),
(58,NULL,'update','users',11,'Role changed from \"refmanagertobe\" to \"nurse\". ','2025-10-24 13:36:54','2025-10-24 13:36:54'),
(59,NULL,'update','users',8,'Role changed from \"refmanagertobe\" to \"patient\". ','2025-10-24 13:37:35','2025-10-24 13:37:35'),
(60,NULL,'update','users',1,'Role changed from \"refmanagertobe\" to \"assign\". ','2025-10-24 13:38:06','2025-10-24 13:38:06'),
(61,NULL,'update','users',26,'Role changed from \"refmanagertobe\" to \"refmanager\". ','2025-10-24 13:38:33','2025-10-24 13:38:33'),
(62,NULL,'update','users',11,'Role changed from \"nurse\" to \"patient\". ','2025-10-24 14:27:41','2025-10-24 14:27:41'),
(63,NULL,'update','users',6,'Role changed from \"refmanagertobe\" to \"refmanager\". ','2025-10-27 17:11:34','2025-10-27 17:11:34'),
(64,NULL,'create','users',28,'New user created: Brian Marsello (Role: labtech)','2025-11-12 15:58:48','2025-11-12 15:58:48'),
(65,NULL,'create','labtechs',1,'New lab technician record created for user_id 28','2025-11-12 16:08:37','2025-11-12 16:08:37'),
(66,NULL,'create','labtechs',2,'New lab technician record created for user_id 28','2025-11-12 16:17:38','2025-11-12 16:17:38'),
(67,NULL,'create','labtechs',3,'New lab technician record created for user_id 28','2025-11-12 16:21:46','2025-11-12 16:21:46'),
(68,NULL,'update','users',28,'Facility changed from \"7\" to \"1\". ','2025-11-17 06:46:37','2025-11-17 06:46:37');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `blockchain_log`
--

DROP TABLE IF EXISTS `blockchain_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `blockchain_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referral_id` int(11) DEFAULT NULL,
  `tx_id` varchar(100) DEFAULT NULL,
  `status` enum('pending','confirmed','failed') DEFAULT 'pending',
  `err_mess` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `referral_id` (`referral_id`),
  CONSTRAINT `blockchain_log_ibfk_1` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blockchain_log`
--

LOCK TABLES `blockchain_log` WRITE;
/*!40000 ALTER TABLE `blockchain_log` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `blockchain_log` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_blockchain_log_insert
AFTER INSERT ON blockchain_log
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'blockchain_log',
    NEW.id,
    CONCAT('Blockchain log created for referral_id ', NEW.referral_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_blockchain_log_update
AFTER UPDATE ON blockchain_log
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.status != OLD.status THEN
    SET change_summary = CONCAT(change_summary, 'Status changed from "', OLD.status, '" to "', NEW.status, '". ');
  END IF;

  IF NEW.tx_id != OLD.tx_id THEN
    SET change_summary = CONCAT(change_summary, 'Transaction ID updated. ');
  END IF;

  IF NEW.err_mess != OLD.err_mess THEN
    SET change_summary = CONCAT(change_summary, 'Error message updated. ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'blockchain_log',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `blockips`
--

DROP TABLE IF EXISTS `blockips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `blockips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `req_body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`req_body`)),
  `req_head` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`req_head`)),
  `auto_block` tinyint(1) DEFAULT 0,
  `hits` int(11) DEFAULT NULL,
  `blocked_by` int(11) DEFAULT NULL,
  `reason` varchar(900) DEFAULT NULL,
  `ip` inet6 DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `decoded_tok` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`decoded_tok`)),
  `req_meth` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `blocked` tinyint(1) DEFAULT 0,
  `sent` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blockips`
--

LOCK TABLES `blockips` WRITE;
/*!40000 ALTER TABLE `blockips` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `blockips` VALUES
(26,NULL,'{\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.49.0\",\"accept\":\"*/*\",\"postman-token\":\"358a8541-753e-41d0-98b3-1fcdf0453c1f\",\"host\":\"localhost\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"69\"}',1,43,NULL,NULL,'::1','2025-11-17 05:45:16','\"auth\"','GET','2025-11-17 05:45:16','2025-11-17 06:34:52',0,0);
/*!40000 ALTER TABLE `blockips` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` enum('support staff','IT','Nursing','Clinical','Special') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_department_insert
AFTER INSERT ON departments
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'departments',
    NEW.id,
    CONCAT('New department created: ', NEW.department_name),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_department_update
AFTER UPDATE ON departments
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.department_name != OLD.department_name THEN
    SET change_summary = CONCAT('Department name changed from "', OLD.department_name, '" to "', NEW.department_name, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'departments',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `is_specialist` tinyint(1) DEFAULT 0,
  `speciality` varchar(100) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `years_experience` int(11) NOT NULL,
  `is_consultant` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `license_number` (`license_number`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `doctors` VALUES
(1,27,'MPDB/KE/123456',1,'Cardiology','MBChB, MMed',12,1,'2025-10-21 21:09:17','2025-10-21 21:09:17');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_doctor_insert
AFTER INSERT ON doctors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'doctors',
    NEW.id,
    CONCAT('New doctor record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_doctor_update
AFTER UPDATE ON doctors
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.license_number != OLD.license_number THEN
    SET change_summary = CONCAT(change_summary, 'License number changed. ');
  END IF;

  IF NEW.is_specialist != OLD.is_specialist THEN
    SET change_summary = CONCAT(change_summary, 'Specialist status changed from "', OLD.is_specialist, '" to "', NEW.is_specialist, '". ');
  END IF;

  IF NEW.speciality != OLD.speciality THEN
    SET change_summary = CONCAT(change_summary, 'Speciality changed from "', OLD.speciality, '" to "', NEW.speciality, '". ');
  END IF;

  IF NEW.qualification != OLD.qualification THEN
    SET change_summary = CONCAT(change_summary, 'Qualification changed from "', OLD.qualification, '" to "', NEW.qualification, '". ');
  END IF;

  IF NEW.years_experience != OLD.years_experience THEN
    SET change_summary = CONCAT(change_summary, 'Years of experience changed from "', OLD.years_experience, '" to "', NEW.years_experience, '". ');
  END IF;

  IF NEW.is_consultant != OLD.is_consultant THEN
    SET change_summary = CONCAT(change_summary, 'Consultant status changed from "', OLD.is_consultant, '" to "', NEW.is_consultant, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'doctors',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fac_name` varchar(100) NOT NULL,
  `fac_type` enum('clinic','hospital','lab','specialist') DEFAULT 'hospital',
  `location` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `photo` longblob DEFAULT NULL,
  `fac_phone` varchar(20) DEFAULT NULL,
  `fac_email` varchar(100) DEFAULT NULL,
  `sha_code` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `mime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `facilities` VALUES
(1,'Meru General Hospital','hospital','Meru Town','Kenya','ˇÿˇ‡\0JFIF\0\0\0\0\0\0ˇ€\0Ñ\0	( \Z\Z%!1!%)+...\Z383-7(-.-\n\n\n\r\Z-% %-/----------+--/.------/--------------------------ˇ¿\0\0√\"\0ˇƒ\0\0\0\0\0\0\0\0\0\0\0\0\0\0ˇƒ\0G\0\0\0\0!1AQ\"a2qÅë°±#BR¡—3brCSÇí≤·Òc¢$√“Tst¬ˇƒ\0\Z\0\0\0\0\0\0\0\0\0\0\0\0ˇƒ\0,\0\0\0\0\0\0\0\0\0!1AQaë\"q°±BRÅ¡ˇ⁄\0\0\0?\0 wbóv*HÆ≈}i‡wbóv*X•v)wb•äQ@‰)—NäT¿lRätRä\0lRä|Rä\0lRätRä\0lRäüá7@. ¢vñ 	Ú÷£+E´†≠¨dRätWbÄ¢ù√@\r£Sö«zª´\\Œ¡Wπ\0ç7õø\nå√án8#!+iîÓ}f`<˚†	ı{2ƒmU{4ÇNÏ\nQHSÄ≠,Ã‰RätRäb¢ü»†E(ß≈(†Er)ÒJ(ëJù⁄\0QJ*^Ë◊2TÿËé+±Oä@SëJ*L¥≤–\"îS‚îP\"îS‚îSë]ätTÿ;Ó\"LfeYÈ$	§›n+9{´ìÊﬁ^π|y˛%*©Ì¶èÆ√AÆæ!ÂQ≈L^ÔÔ§T∫9eŸYYL2êTÈ°A◊MÎ∏ÑÜa—à”◊\\4wÓªÓÌñÀükîÄu?hÈRÁ-˝\rEµ±]¢Ø˝íƒ∂·˙öO˛\0’ïé≈.ùÂÛØ$P>,O ≥óóÖÀX}“)å¿W¢XÏæwFr9≥1ˇ\0L\n≥√a-€#ª≤âÍ\n	ˆÅ&πÂ˝BÑŸ™Òe€<À\r√Ø\\Ù-\\a‘)À˛m™⁄˜æ∏V-·7]IHœª%õ,®\"+zNÚG„Ò†8Ëú.#R~¢ÔóÿjÂüõ95Jç„„∆<ûyèºÆP®–Z¥∫Ä$™Ä[N¥8ñÙO¬g_U_p†Ç‡Ô##]z∏*ßÀRÚﬁΩ,hÈﬂ£ípyÎÿWb¨R»a‹®Ò5ÒëéŸL®∑â+A5ºfôìãDqJ)˘ie´$é)EIñπRäí+ôh»•OäTqmSüƒTÀfŸ‰*i>T≤WùòÓHÄ·”Óäå·GAFE.Ët°M†q@&⁄ÛàƒpWñÈHG—LçfH”x0jCÑjô∞òá\nÑ‹kjU1ëN¢DÛÉŒt⁄5¢XçU?‘ªE#·j6µ|ú?ƒ›@NÄfß˙Eú~”ìØ ÁM˘p]ãAæåßuM6è*⁄€·VF÷ÁÃí~˛R®YÄ´ÍÅ˘Vr˛†ók≈}≥gÖ^m≠?¨àˆÅVnÀﬁhÕëA‹&?¬¯÷§6˙˚ÖHÉÀó3ˇ\05åº¸G¬FëÒbπ)∞Ωô\nMˆáå¡BÇ@3ªf;Ätä2«gÀ˝ôc’ã|¥_ÖX°€QÍËﬂs¸´õZ~Õ¥„ËV0»ûÖ¥M>»Ú‡˚kÓ˝\ZÈ]NÉnu…€_wË÷m∑…iPÉoπ¯|4©\0à:◊≤£AæÑ¸>\ZSîG!Î§îı>·K/ë>≥˛ÙÉˇ\07ªÙi¿LzG·@ÎŸBÒUú=ÌgÍnÏ?ë®’µ¸¢Ü‚ó≠≠∑KóÌ[Ãé≤Ï´ÅY2v÷Ä<7¸&˛üíˇ\0Ω^,}ªwr_\\… Ù\" ëÃKmÌÂ@q‹%´a≠⁄ƒ€ƒÈâ{c¬≠™Â‹Ã|Í∏Ñ6ﬂ√\rñÏy€œ∞Vœ≈‹L‘-S5÷l¬£P‚ÁﬁñP\0*˘\0->/(ä⁄4éï≥r…∂¨¡ìª∏@Ã±ïùU+òuÓ≥√‚®a>c°Ê+“ÒÒÛ∂ŒL\\<¥àª™ëm\nò	Â]].FTA‹”Z’‰f°fË)&¡—t:◊\Z⁄ı©çtÛÃä´^≈O–!ïLl˘äUVà¶oâ›A9≥\06m~;¸j”Ñq§∫¡&u÷4ÌÏÎY˚ß¬ﬂ“iú¯£˙_˝-_<±¶∏g≠¶ô≥|}Å∂wı˘‘M∆TN[Îv-UåüØ◊∑„\\a©ıü◊ÎÚ§Òf˚\ZÑWAˇ\0æoÇà™>0OÎﬁÎÓ˛õ≥S˙˝{b∂uØóÎ·Mˇ\0◊Î˛\" †Æ•˚[zcÒ˝~µ⁄{yÚã‡„ÎÌWÁ˙˝A⁄ÄO&:˙ø*ã/ó>fõ;ÌÏ÷§6Ù‘Ê∆Ä≈Òú5Ω.b¨ØñuütÕ˜˘~T‡æ\\πöÃ‚ª{√–üÆw?»çÚ\05Qà˝©ÿ¬¬ª∑x øÈÕEéèC≥h¡~˜@Ÿ{µQ–-©˘Tã®:1¯~UÂ/˚N∆\\ï±b⁄ËXåØpË5m¿–îÓ—qã±‚∫ÅæÍ-±˛l≥Ò¢ƒ{/vfrÅÊMã‚∂-e#´®?^4‹/zMÀ¨D˝´≠ps‰ÖæU€ùïT∫∂û˜à⁄FÑIÇ÷Ö»9äÛ1ß¬û‚Õg¶‚˚w√”|Isˇ\0m]æ*\"©±?µ,*ò∑bÎëÕ≤(˘ì™`É¬Åv·$ÍQ∞Í§ÛVã	˚43&Õµ“<nƒÌaà¯Qø±)ß¬)1_µõ‰Ô\rm:/sﬂh,Ol∏µ÷(•îâëj–ù∆†ë[¸?Ï¸´€]˝buéc)ÂV\'±÷ö˘º˜Ø1$ûÏ∞Óƒå§eâ€Œ•µÏ•ôÙx˝‰‚wµπvˆÒt†ˇ\0)aÚ®ádÓÄÏÃÉ%∂våƒËÖµ FÒ¨◊π[ÏñLŸÕ&aŸÿIË•† \"≠0\\6Õ±ıvm¶Ä®´ hÇñhçF~œöx~–mÿº‹Â-ªx]´¢‚¯th29 í?Ú1_IbFá˙XhØ&Ì_cÖ–o··.ÄYóeπ\Zì¸ØÁ±Á÷à»©D»aŒ£Õÿ˚Å§‡WT[iYÒüí÷Oá„CïÕ£	ÚG¿œ„ZÆ@∂Ú$Á¸z>Y«‰pÿ°“öÿìIèÚÅÏ¶\ZıTQ¬‰∆±Û©-∏M3-s-6Ödœã<ÖÃM?-s-\n)mëÂ•ReÆS$¶πË∑öü∆π¡4∫\'O¸çCé1m†êtÇ7‹mRˆwà[ﬁ%m\\#2ÜÒe`≥Â≠|¡Ì9%…§∑Ö∏ﬁç∂>•1Ô˜Tˇ\0πoô9 ubÎıÂC^6‡ ﬂ(jÄ(çA‘A\Z≈ñÖ€°Z˚ñÃƒ-ˆFl°HòÄv§Nu—hº )Ò‚-)◊@sµ”NS £Kÿ$ õÊ·@\nJòôë° kœïQ–™ˆ¿T⁄˛†ìµ≥‘ƒ◊Vﬂ◊¢⁄G [πôQfÓÖ–¯LÅ·ç„≠1g9wµò“Ï0∏{!Fx{v¬Ü3$È†:k@?‚˜é∑]AKqø%Ü≠\rÃ—âF*™ãbË%ò€Ω>ñRwzsÁSæ9E÷\räµ›d9\ZÿÃŒ¿Ë`ÑÙπŒî s}#{5äª¸[ƒÛ9⁄„ˇ\0áü:õŸ;iv¬]w=Ì’XP´°dY?x÷ëÒ®J‰{¨á-∑3Æª‹@7ÊSiØ·èsp˝@%’5ÕoƒP#ÀL√j™Dgüef≤∏`5Ò	ãæêÑ¯´l√f h5$‹X\ZÅuí}^t9„L¬∂\nè}pÏ‹¡À:T‰«5ÊπiÆôZUmZEœ>çÔ¶F˝≤Âm·2˝1Akn±h1ÄPÇ¬Hj.+b–pÿã™n2…\n§∞\n«ê1(Ç¥†∞*J€l§Kcô€P¸]µ¬Üª†ÓFEU3í÷æ¥ÈÖ™‡∂∑⁄K2V÷1[∆Ï˚.a†üU;⁄L@µnÂº=õNÌuL®b–M\\Çtr=Ç´Ô‚ëÌ∞_kD®&Z\nÖ‘Ì•GÇµä\\5°gYª‹Dá°A\\<ï–√k<®≠∆õÈ›ü‚ò€ò€+rÁ’ñiPàdh’Doq^êÊº„Ç`q´ã≥qÌ¢ÿS7â§ü¥w´zÿ†T∏ †ôlÀ7÷j%——Ñ›;^¢5™€¸f–¥owä-Ü []ç∫j;Z”≠∂[†≠“˘JâÄãôâí4ÇªN‚ûÜ\'¯≤ı#Ï∫[ï26ïé‡›™\\E€v“›»r¿±2â`WMƒuù(å?i-∞≈òÕÙtgAò¯¬Çd∆¿¯O©™üçâæﬁª]Ò˜ËZ±5WXF¸çeXJ4?*∫ÏıÓ˜nÎ™Ê`fì$h™≥÷TÄrÌèØßJÕ¡¬N/ß_A⁄íMWoÜ}[_eä‚Ÿc!ñs¡q=‚?xzÍ˚Å«v„˘Å¯Tº<Ü¡ªfû—Ô IZ–ÎFÌ\"4ÈπÖÿ∫ó2ZPA[¨m°‰˝YçL5ﬂÅ5	€‡‚örçv\\\\äÓÚ›@È™ù6ÿç¡Û©ª£“ΩU4¯8⁄h)e©≤W\n”Ã*!äQSÆãG•Çà\"ïO‹\ZÌ,»2ò˛$Gt“$xtù7Èùù∏Ω„è\Z˝MÕm∏ïu]µ‘oÁKàˇ\0\r¥üGaÆ‚•ÏÊY‹√Aµ\ZÅ≥e–ëÍØõ=I¥π,¯õv˚ÒëÆã™∂ÿﬁøm≤É2T*fSßSQX≈%´°Ì[≤≠ﬁ8˜\n—ﬁ6PHb6ä≤¡‡êí≤“GŸ^Dç∆µ+·ùw¥¬NÌö5Á∞)û¯\0¡cØñC&\nﬁí-%≠◊ÄJ\r\"ÂÂB=€ŒnÒ¸/9Ô“ç\Z—ÊŒk÷ÿ5ëñ›˝;À{˜w> ±\'œ Äπâ∫c66¬ ¥ãvÆ?ﬂÇZÂ°ﬂï1ÔB¿·Ä∫ä2+wè?4øØåyÛ<çXa¯5—˘@R\0ÉR‹–ëŒÑ¿*◊Ô]~„‚[j≤2ﬁÿ˜íLi∏Pˆ0÷÷ÂªÇ÷)äAªt›»Ã\r£ÍÙ∂ä\0¥N§Æk≤D.\Zu>£Àï5l•´¯UUo)íO±†&°Ω≈]û€wVÅ€≈yÃC•≈V;˝ìR`∏ªΩ¸4õ>,BØÜ“≠HÍH:ùAÈA*˝ÖŸ≥iTJDÄg¿†òﬁAôÂŒí‚…ÔG—.2™ºπ,åÖÄBùÁyÿUgÔ[•O˛¶Ë’G’ÄÉf˚¨Ω>‰nÚÌƒg∫ﬁÕ j9™RUÿg\nD|UÑ8[\nÆ÷êÀ\\.¬ê\\ËOŸØR≥ŸÃ-±ïl†L@â–N€¿\Z˘Wõ>áiiK∂y»–ØÚäı{≠ÁJvmÉM[√[]è*ßÌG˙/uyP∂WÇãªH*ûm> ∂/A„∞Iuê¥˝[f\0√,0Ê5òÍ,9( ⁄æÉY+Te1úd‚0‰16~ëà‘¢VAﬁù)†r˜qv¨‚X¥Av,†óXBIú¨C\r˛—ç´_{Äa›Yﬁu∏·ÿ31Ä\0Øá—yı©0¸\nà÷”o#e*1ÍŸß1–o“∫ˇ\0∫U˛ˆÈ˝v2—˘0Bqwh¿©∫ˆŸB»Ê|€W\\;\0ˆé\r. ˜ŸÇ*πÇ\'X¨Iâ#Œ+Yoà°QTrUU~@@ÂÔ®ﬁ‡ÎS/1ˇ\0j•øÓ®•Çª3¯⁄πékvötÓ4Qúõj!I#fòW√{7ç[è=◊uv’ƒ\"@dï*†ï?Ÿ÷`Gñª5º:‘ñÓ˘q®^^\"Tæ—Wﬂ»Ù£˜ıÏûhæˆÖ•R›≤\\íL…vEézkΩeΩø:–%„˜O¿VfÕ›H:ÁYœ‚K4π˙\rEER≥Ä[∏{a˚ã0Î°“⁄¿=GëÍv™ÆÑkWï\\(\roîœÜJò(wG˛^£M…≠}U≠2˝U≠Ù\r}ª˚i¬ÿ>\0àaPu)5±\n[ï=üH≥î¸Gù!¶~–ÎÏä≤»z–ó0&Ÿ årÍ@cËœ w#◊M(˝~5Èa~hßg$›:h∞ÅÃ9ä·E<á∏mU«7]˜¶…ÎÓ≠4˛H‘¯,{±”‡)_?u∑˝~ˇ\0ˆßõ«ÓüçÛ¢rGOÖr°ÔF•FV,»Ûé(ﬂVw›|πäÁgÒ.Èp∞HÇIQgS©ÒÌÆÒ»`2∫F˙—=ûfÛwà¥ê£F$µ≠\0 t◊_UxÙvM¥1[4∂%¸j5wèµ:t“†˙9,§Y˛–íY§¡+ÆÑtÈVò<f#9ÀÄ∫\0u\\≈^%•ß –@ÁÃPÊˆ3√6l€Ä9Ó\"æøtk“#Ûz ¡a ‹∂T=÷\"ƒfm›˝\nêpÎ†X,+ê\0uÕ”/Q]¡€∫Œó.]∞Yƒï—£¡z&`@ô\']èJnú°∏ÇŒEƒkÈ¡““ç4Á òS\r√‡œ|ùôŒò‰Àto$Û©á\0È§r39πÂhl\rª|Ò7.7—±.ÓIvLΩ¿dj\0Áäœ\r±£d≈?ÅƒÂ∂†˙{ò}u1ø*\nôdÿL:Â\rr‹Å·‡ô<≥ÎÓ¶Ÿ{B˛X(ÀÙÖòsZ˚D1\Zﬁ\n»Óˇ\0Ù∑4ÿ‹º<Mº[JõÉ‹¥óp òk*¢{À∑HÒYÉ±;n9\r(∞Q˘	˝„Ü∂∫\"3dFaèê;7¬à√qõOr‚…óºóeÅ°ç2i◊ß∫™7¿–∏E9ó˚˚âÃé	¶Ùeºm∆7S=∂ãn⁄\r‹‰QÛ¢«H—Ãfﬂ≤√1πk/Åµ$©\Z∏≈zÊo!Ì5Â\\≈ˇ\0§·…EﬁYÂNDHïÎñîçpRIÄzähûø°Rï§©Rl7/ôß_ØuJ∂ı¢Eö\0≠{C•FPH–{™∆ÂùjcZKhTÎáß%±‘{Ë≈ôdüY≠Zïh{≈gÓ`ò±!yùd~∫hMï\\70≥oƒ_¬}-¿ñGêÄê£m\\Ù=\rIÜ·∑B\"ê≤/9ŒÑQªèXˆ˛UDÿ”õﬁè–£üÑı∫\0Ûç=≤*+ò,:˙xªcØâÂ]xSÇä∂sÕIΩëz?QNÔó∂(\\v;á%∑+è¥Ó™≈T]∂eÄ0∞≤u0().è	÷$©ﬂ÷:è1[BPüŒY£ .;¡ÂM7áQ†r◊rä”\"#S‡/ΩıR°;µÎJñDV£<Ôä•æÊYn∆¯1\\Ωr¿~t7ëﬂœ•ïå§©’Ì)ü\"hÓ:ƒap˘Dô∏@?◊˛‘˛Õõôo∂Ú)&L5π:r\Z˚´ÀgDõGmaÀ1&—\'ΩS.⁄Ä	◊óZÊ˛®AI2t∫∆#Ó£Ì‚1ôÄ˙=µÚ¯ÿ)À¶≤◊\0Â“á\\V&o£)9ÅıâÄ\Zw¶w4àj^Üÿ√ï∏≥ï[Ë¯è74øUèCO∑ÄΩƒ¢Å jsG!‘Wpñn3ó1rˇ\0Gƒ	WS–aà©Ú;’s£¯ghxJ•‚Oß≤6”ò⁄Å”-0∏b∑r≥±£›Ö»9≥NìO∑ŸÚ⁄ñf*¨<ÃÊÚ=hl´bI≈aáΩ„	r@Ò¯Åbâ€ Å-≥äƒ?’‹˛…Lˇ\0_˝∆£nBÅW…p‹T¨ñç6◊V1∞°ÏXKXå\"®VúJñ%N{#ìGMË4·∏rmiäh\Zxm/⁄cØ•ÒR<=ãWp ∂1qJT›∫Çk#1QgQ∂í6:Î†¡GmŸ\" C7,Óπæ±\Z\Z\rI˛m<®Ï=Î˝ŸV∏¬B©ù<’ïRå%ååNÍ N|C	0˙Èñ7>˙2’≈F∫R›ª\'%…πnÌ«∏<@Ë;¯¯P7Ï’6ºnYf∑îwñâæÇTÓO·^ÉvÍı„|Öõó\ZnŸå€ˇ\01öˆ\\A•#\\%VS/ªîRÕ¶ëÀ⁄EOöì›P!⁄i3˘ÚÁ≠I©ü‚˝£l(Vºó\0bTe@uLí`iTÿü⁄J®êóòyw`˛QÌ™Æ⁄p◊∂@kΩÌº˘óV9ì!ån¿ôùy\n•∆ÂL=íCô{⁄ÜUÿZ1≠≥÷≥SìïU…—£Ω˚M\'l=“tÙú\rıA∑ÌI	◊“∫ÁmNôCA}—\nÏŒ%-@Ã§Ëã È]πn ñ`üv~rÙÙ‹Ú≠^$,œ;&~›b⁄J·ÌÆvç@˚√ôœ˙´âw]ÏX	ú€—5Õî77<ç\rÜπkùú†Ë¿µ∆$Jù<Q»üeƒ/ ¡ØtN\"r≤⁄c ÉÔD1!.94¥ºF˜ÍπÅ#*€“	^jz\ZÇˇ\0‚3c_Pôá˙PUﬂ	∂∑,´2° ∞%±ÃûûtmÀj#P4\\ÀÚj÷åﬁ+1¯‹^(òle„†>óp GZ#áp´∑1)iÔb\r‡åŸÆò\\ŸIíLu≠M∆ÈÚ_∑<áùÑÀﬂ°“E’ç	˚CúS§\ZéÃ=æÀfæÌ\\+ﬁÑ.mírÊâÃV6÷k∏Õxî5≤ÍU9iºsä.“è¶èˇ\0kˇ\0rµˆ@ÃªÓ6S◊Œ(H%6åÏﬁKV.!P◊‡eÃ	îhú¬AêF›\rT`xï€o\Z◊ﬁ/ezè¥èÉ∂L-À∞Âf36£BHÿIıV_àˆ^ÌØïªm\0ó1+◊MËÆ—¢û€ó<é§[mXâF∫NΩ}utS ß√›õVÙ˛Õ=ö\nsk ª#à“‹¬XiΩÅr“¢c◊Jû†¥œ2Ì\0\'\rÜ\0L˜öç©ò**∏k,*/è41ï9DlA]Î[∆ª)u¥KÄ˜h“Á\"/çú˝∂Ë~Jçí~∑1Êc§}©€c†Ø…∆ßï”∑)åL Âß«méaÂJ÷ÄTS‚‰I\"zSØÇ‡´π»4Œ€©‰h\\ó2:¡ù,Ìñ#Æ«^≥\\Àßı®3Él⁄õ`˜7î K-–eé-È\'\nΩ[b\Z\Zúﬂu<«:?ÜˆG‚CZ`m<}m∂9°≤BTÎÒ®,p,m•Œ˜Ã†bÚ±ŒDi¨”zÏXìJ›}I”ÙAÖ¬∞∫P‹nÛË˜@€6h3òu„√Ó\0\'}XÒNm}/1Ó¶&`ƒãÉ0FûÛ√;mØ∫¢¯±‡)Û(Ùæ¸k“9Vâml8·Ó‹!•s\\-îN—:±Íj,&	lﬂ¬c8î »Å‚≤5˘T‡õÃ© 6\'R%w¯Ú;r\'á‚ø±„g˙Ù\0«àïkg,f\ZQ©;’G»ìuDº:ÏÌÆŒÆME»lßñêÚˇ\05G√¡[˜GtÈÔ÷‰`4Åœ ™p¸?C]É09°F†4\r†‘Û4j%†ŒQNboÇA\"A$.QΩ[ÚbΩâa¸öéÛw.Z1+ﬁÿ”ƒ>uÈXÜÚ˘Wé`1v√X#’‹ÍŸØ3I)ÆR‡1\rß™∑)≈qó-õ¶⁄\"íŒ≠¨I–+4àçzÔµ5èpi“‹ªΩèE`Ñ¯é¿gs\Zl`≠E≈ÒV≈áÔT≤∞\nUNæ-=ïÁóªQp0Éh0$ÊnÁ•Æö¿`\"u:ÚßÒ–‹∫àå|AÅŒ¨FÑÉ®\ZN€¸*%é∏,Àv‚ã,˜UÆdUówÅ9Yï¶\ZrﬂRqÓ}≠ZAbÓdπp0u~Ï$l5*⁄çËå7¬€n-≤nZÒ:Ì,¡â9≥Kk\Zë¯Tñ˚Ud]r¡∏±ßyqâRHlæ\"NM4SÂÁS∆$J6 Vkg∫{E.*(!¡T:N∫Éµu0wVÊG[®ÊUU≠8Ye0≥ò?fõTÌ∫âyÌ€V∏µ±sT©\r∂r=Zk7i;]ÉƒZ(Œ⁄xí»œ~Ø°çˆcBÑ[ª®ƒ1ÇzLŸ°XåW]ù˜<¡≠n?±xñ≤⁄Ù1\\êñ@\0√I/„XkóÂÄsxñfVe$ÇeeZgP`ÈG7Ì“⁄Qe »ò1DI÷	10:÷–¸ãrrEæA-ˆëUÆ¢ï,|,ƒcÀ}*WÏ^ \0´ä \0Å´Î©<àÎ¢œÌÀNTs}‘Ô<≈Aˇ\0^),‹0\'¯c®ﬁy◊Fy&À›ìƒ‚ÚÄ™5Lƒ¿dûtn≤◊Ë∏ÿí¿6`ô`n‘7≤Äˇ\0≠XÇF\Zˆë¶MLˇ\0àÙÆéŸ‹ÇFˆÑÀÃÎ±ÈÒú§\nh±¬vÿºoõÓ[;8\0*ÄXìÊt\'ÀjÉÿ´Mu…πtîiñqÃÉ\'„B7mØÖ,0w¥ Do!åˇ\0˝ﬂà™~)€úfÂ÷E≤FbpX®ê>À/Q å“EeÉ5\\KÇΩõKb¿RãôÇªFrI¢#hœZà‚-‚ˆÓYfK 4i·ô÷WBF˛|¶±_˝S≈≥MÀ6X°”‚]´o¿∏Òƒ\Z—¥· ÊÃ!∂\rvÂFgÿÚ.â0‰Xl√(ÒiÆõÈß∫¶˙ö¨Ì=ª´áºˆKf!Qd¡e\0ô<˘–]ú‚Wn(K÷Ó°\0v≥w]OãEìß &}zh±U—.4h$W+;ãÌñ€µ≤Ã≈IÑ¨«8h#€]£QR§qìÆ´]ªù“Y\0‡”Má¨\Zá«.øÑ?tÅ}Jﬂ<⁄ŒøU7¥ºA£Éh‰@$;©S:zAµ\Zh5™éÖ{˝˘Wπ≥ﬁTÀ\0U`œ]Î∆”õ{\Z–„ƒYíÂ£àvGi»I OÑÃ\rœÑ¿Uaº¿Ç≠ñ\'A∏éÜ*ﬂ\r¿›Ã\0\0˜Ä¨Ï¿f\r™ÃDit‹?\0uqÙÇ¨¢b‡Õ9v\\√pﬁœ]o_c”ïXf¯KÆ‡(9Ú√[$êÍƒ	¢#≠Icà\\èÂy\"T¿ì ú¿ÛÊE3â\"ã1jÂ†=ØqZÈQ0–¿\ZiDé¥·çqº\0Bè\ZíYµÙI‘NÁ˝ÕgâÅ\'¬Ü˜Æ-ò¡iµ`mÎ&°≈å§/1°\0œ/‡A:Û#Z.˜πá∫Îr€∑dπYÃKxe¨ícIéT“{‘ÔE∂Ib•	ŸåÛÄI“v®–qV÷„ãií®Ç∞ŸfLôΩ6ùj{$ñ±9/+Ø⁄¶tÿ|hxç¢–öJÄ=9&DÀ.ü:;à¥q∂í“Õ´x†ô§˝b∂CÍ-Â•VÓ–±>Aï\\è‚?/†Ït’µÂÓ©{êÅâ∏X\0–4I‹±&4Üµ≈˝l3»*ö9:¡◊–ﬂ@#î˘WqÿÊ∫Ã¢›»píCA+¨œIKÚgπ>‚3XÙî˜Î›ç K0â\ZçH◊Zﬂa8ÜR¿Ò{B‹ÖπlwÑ8Ä3eÒ0\'“ÙÅΩa∏M•≤ñ/~ÛÈ6µŒB \0 ÑE§yò€Jˆû%É∂Á≈mK\0r≥[Õ\0¿\"Hèd÷–¬qKr‚x–±a0ˆÆÂ\'<®Ùc0$∆⁄|h!dµ≈∑$òís∏ZWßZ·7Z˚≠Ê[ñ–£K%πÿ¬ÄeAÏ‹’Oj∏x7¨‰|ØzıÀ$ÃôB±0~tK\n˜âÉ¥ŒU⁄	2NPFí}èëßæÿQ9GS¥¿É>Õ¶Ω«ÅKv˚ªH™∞@\n\0ìIç…Êk1¬˚5û’Ç/:Z∫A»ëòú¨·ç÷æ¿ EG·“+*≠˘<ÔqÇ≠±>AÃ±\ZÊ“V@÷`s$ÛÆ‡ô®Õï◊.¨5ûcy•{5æk!¥ ôÃ@ŒT2∆I<≥oØZ«≥å65Éπk\n◊én4˜f$ÎñØFﬁÊxäëf£ÍCdrÌwƒ$mêi5é·8ãÜÍåÏ}1È>\0:∆˘G¨÷ØÅ‚n+·Åe»JD\0| Äuﬂ€YÓ	á∏∏õlP°RX$ÜVA#r§Dç=ï∑§à√ã¶\\6$…ÄD»g°◊BióØÓS¶≤À∂öËióÓÏsf%Líà=  j\0Ä6ÅÂPÖ}f ˙¥ÊTçó§iWfn)JÜ‡¿≥eÙÜ~¸©Ë|-™zK y6ûçq/ÅsªÀ9R%…- eÀk?*™¡c±∑‡CÖsY¥ôÛ·¡\'Oˆ§õ¢úmóäÄ#x÷I]a˙?Eß‚±6‹=∂∑&	.úŸÇG-∑◊Û™ç«>eh]¥%¨ŸQ\\ÕØwe⁄Æ¬¿≥ecn— ¢NIFÉûëL®√)ú·ú µ¸å%QâsÆ†D\rG>û∫Ù>fıµøä[9ëm6RƒC2ôÀ‘\ròﬁÑ¡·¥Yf773îHRc^∫˘—+∑UÆ⁄,›Ÿ√\\pæ ô•@0tòÕÒ•{ö.	mﬁΩé√Z∫ó>ä¡›Åµú∑Ñ≤A`À°ﬁ=T\Z‚ÿ¸0˜É±kr•≠Y2Ωîc%Nm.}≠~ueÉ£·nï\\∆Ÿæ·G=KÖ¯≈∆ŸØŸK∂º/‹Ê VY3µó$Œö>ZäRtä£¯ÃK∆ı∆$ôe.A3©\"=ZR¢^˛)ŒkwN]ï¥u‹\Z\r≥ÜÉÃA•XÊ_%d4Î¡Ó‚m;\\ƒ\\±›Zú®ùÿÖÛ1+1ùtÇñ$ º˘Óùâ0¸ÃV´¿ns&%Õ∑%{∑\0\Z%”O>ï€ùç`&€(|»eÉ6R£≈êÍP70K¢∫,cµ·)ÇÕ¸:ã≈ùmælΩ„¬1rì¨}ºËKó÷˜àÂ2|E\ZÈ˜àh˜~c[w≥◊MÀf˚-ÀvÀ≤⁄˙”´Î°`BÄIÄ\0ﬁw÷©∏Á\nT,Îq—w““Ä∫–YÜÑ…à“hé$WOFvÔFçHÅÀY<ı5&≠á€7x\nê@ú§Ì:G=∫\Z=;5àh\'n ª:â\0iV∏r’ªñ˚¿¬ÏIÓØ9–DÚˆÅU®ó»¬\r´∑ônΩÂ7nÂ@@\0Ä\"4¸Í”èà◊îπUC-$xr» [_3÷h~ÄE€Â-Ån€\0éBXê }*_£[Ó ‹æ3Bdªt»%AçÚÈÕ{Ót:⁄ÄÌ=úZÑl:}]ên™Ñãaâ∂Ï±∑ñ’o√._≈7uáB±f!≠æShx\\ÀIåÀ;ÔC·∞x{.Dóf[zùS¬¬äÕµ±{Ω∂∆ƒim≈∞R!îQ≠8Œ	ë$⁄‚∏u±x%∆en §Ä@Vy.˛ŸÂBam√3[5;&vÀ¨èñÚﬂïY}Ì-ö„Æƒ±ºh.eÊyVóá„“ûÁæÏÂDÓDú⁄ÍOæÆXÈ∞ ,o≈]≥lweç´•ëMõù·e,E÷vl∞s∑)?,ﬂ‚òîb.^ƒ´˙Fq!wê†ﬂJÙGæd5´+Î∏ü*£ƒ’v.ˆ∞ÏÃÊπ:r—H¨£éó_±RÖÉ)ƒQëÌ•€í%Ì‹∏2œÑ¯µ#“Çßó≤¥w1Wn˜nmdâ[§¨ZQaAô]`Œ˙U*3!ﬁ∂öEÓù§\0 Î\0ù<È£ˇ\0˝Ã√\rø \0:ÅÛ©x÷ ä6\\?¥FrÑíÑI…®\\QÌaÏHKNAb¿\0\"‚~`VH3hUò±$ ˜ñŒ§Îö\Z}^{◊oaùÑbÍ∆Ì≈#’î	ˆR‘}#f ﬂmm≥®ëê3g\0Ç3Nb#êéFhèﬂ»Ê2€ñ–Í:Ë}sXã\\.ÿ˚7=b“S˝˛÷Ú&ÿ¸4•™˝±cxIG’…l≠\0H-€»A˚—ñÜ|+ú™$∞–nIŒûµ4Q√\rŒáÆ¸©£‡ÜE»AêM¬—˘˘¸*0e(]Ô˜˙8∏ŒQåR·WÓÀŒﬁl3∫‹∑ §†\'QÔ5tΩ†QˆÛÂŒ≥eÆñ∆€8R°Æf\0Ó\'Œ>ªﬂ];‹∂=K?Öm©Œj¢„\r⁄\0	\'ôÍüâ4bˆÑˇ\0sYAe¶{ˆ˘Do≥y\nkY]ÕÀåzìô¯—ùæòç[võ˛“ˇ\0ôG„UÿÆ0ã\0®OöûQUBˇ\0@æ[ò¯”˚◊˚Uå>◊∏¨Yoô\"-≥¶¸Ê§Ω≈˙m&\nÏÉ$ÃzŒ’Pq®˜/ÂMÔœﬂAÏSKe∏fæ ƒì\ZÃ…`∞\Zç/∂QÍQÛäø^w@=BÎÚ‘yW=WÌÊı(„°˜\nNpˆâÃ1Üï\0‹_¢Û(¯4©j¿3/eÜrÿãohdÊg∫gAÎ⁄ªsâ^ÁâU˛õ~\'JªN¨«sˇ\0êßdµ˜Gﬁø‘MKRfÉÆ„A æ-…•èg∫†lF˙W.‹ûLˇ\0¸—îmmG©T|Ö9ot˘“…!\rµç∂∫[√‹ˇ\0#ßúe√∂\Z?¸çóÁKø>T◊∏}`ù<í}Öúkóàa‹ÿY·\'Q‰M:ÂºCh◊-Å ¯PËTÜ/P+ÇË\Z°!]Ô}fç\'Ï-6oN%ƒH–”Ãt`gWºÏ´ÛöÓ*Èc“)È ¥!ÉIÙ‹éôø%ÒÉ≤>…>◊¸Íƒ®›‘{EDqˆˇ\0º˜˘TÂ√\\–≥$\Z∂mèÏ«∏~3]Ñ[QÏ_ ´[â€Í«Ÿ˘öåÒE‰Ñ˚Eêú—loãKÈ>:•~(y\"˚Ê£n&˛KÏñº:àΩ7œË\nÍ‹<Å¯Vu±Æ~€{$|™6∫N‰ü\"I©~D}T“5Ú7 z⁄*∆èææ¬O ®íÀÜoP$¸(•·∑c¯mÎ /˙¢ó‚$¯AùæÉõà/ﬁ\'‘„Q7^å ?\ZÑpkö»=m∑˘©ìÇìv•Iˇ\0Qµ1Xˇ\0;Ëâ∏üÚ«¯ø⁄¢n\"›ƒ˛5ckÑ[ËÁ⁄\0>¿?\Z%8zÀif5ìöO©ç:≈|±‰ó≤à„OQÓ_∆ûùÛlé|¬ò˜ÅZ$¥√—»æ°ß∏]dùÿ˛ΩsOJOñ√\'…B∏‰Ì‘ÎÚô©µvÿ|M¯E\\0O—5√qG!Ó¶ºuÿdâY˚òi7ø•#„4Ô›h7W>≥ˇ\0ƒiG∂$‘fÒÎV∞#Ëu@È√Ìˇ\0v˙ùøN˙%°˝ÿˇ\0?:yc÷öMZ¬äË6Ù;∫N£¸´˘R®‰~¢ï<ëV®˚√÷ï*°Ãi‹©R†gR§ZT©ÀÏ@ëU-ƒ.}ÔpØAJïqcIß…úû„Áwoy®úÈJïavH≠ü◊≤∫Êï*há¡≈>(ıTôY•JÄPN‹™K(4Æ“†§i0<&…Y)\'÷ﬂ)ä#Ö∂ÄÂ∂ÄéyTüy©Wjä£ß\r\"˝åxåt\Zp¶∂ƒ˙ø\nT®F¨ö’±NB• )R≠ì\ZÊ¢g4©U \"w5“•Lëµﬁt©Prï*\0a4ﬂŒï*t-*T©ÅˇŸ','+254700111222','info@merugeneral.ke','MERU-HOSP-001',1,NULL,'2025-11-17 06:32:23','image/jpeg'),
(2,'Kilimani Lab Services','lab','Nairobi - Kilimani','Kenya',NULL,'+254701223344','contact@kilimanilab.ke','NRB-LAB-002',1,NULL,NULL,NULL),
(3,'Isiolo Specialist Clinic','specialist','Isiolo CBD','Kenya',NULL,'+254702334455','admin@isioloclinic.ke','ISIO-SPCL-003',1,NULL,NULL,NULL),
(4,'Thika Road Family Clinic','clinic','Thika Road, Nairobi','Kenya',NULL,'+254703445566','hello@thikaclinic.ke','THIKA-CLIN-004',1,NULL,NULL,NULL),
(5,'Kitale Heart & Wellness Centre','specialist','Kitale Town','Kenya',NULL,'+254729111222','heart@kitalewellness.co.ke','SHA-009',1,NULL,NULL,NULL),
(6,'Isiolo County Diagnostic Lab','lab','Isiolo CBD','Kenya',NULL,'+254730333444','lab@isiolocounty.go.ke','SHA-010',1,NULL,NULL,NULL),
(7,'Naivasha Family Clinic','clinic','Naivasha Town','Kenya',NULL,'+254731555666','info@naivashafamilyclinic.co.ke','SHA-011',0,NULL,NULL,NULL),
(8,'Kakamega Regional Hospital','hospital','Kakamega Central','Kenya',NULL,'+254732777888','admin@kakamegaregional.go.ke','SHA-012',1,NULL,NULL,NULL),
(9,'Voi Medical & Imaging Lab','lab','Voi Town','Kenya',NULL,'+254733999000','support@voimedlab.co.ke','SHA-013',1,NULL,NULL,NULL),
(10,'Ngong Road Specialist Hub','specialist','Ngong Road, Nairobi','Kenya',NULL,'+254734111333','hub@ngongspecialists.co.ke','SHA-014',1,NULL,NULL,NULL),
(11,'Kericho Wellness Clinic','clinic','Kericho CBD','Kenya',NULL,'+254735444555','hello@kerichowellness.co.ke','SHA-015',0,NULL,NULL,NULL),
(12,'Marsabit County Referral Hospital','hospital','Marsabit Town','Kenya',NULL,'+254736666777','referral@marsabithealth.go.ke','SHA-016',1,NULL,NULL,NULL),
(13,'Lamu Coastal Health Centre','clinic','Lamu Town','Kenya',NULL,'+254737111222','info@lamuhealth.co.ke','SHA-017',1,NULL,NULL,NULL),
(14,'Bungoma County Imaging Lab','lab','Bungoma CBD','Kenya',NULL,'+254738333444','lab@bungomaimaging.go.ke','SHA-018',1,NULL,NULL,NULL),
(15,'Nanyuki Specialist Hospital','specialist','Nanyuki Town','Kenya',NULL,'+254739555666','contact@nanyukispecialist.co.ke','SHA-019',1,NULL,NULL,NULL),
(16,'Embu Family Wellness Clinic','clinic','Embu CBD','Kenya',NULL,'+254740777888','hello@embuwellness.co.ke','SHA-020',0,NULL,NULL,NULL),
(17,'Taita Taveta Regional Hospital','hospital','Wundanyi, Taita Taveta','Kenya',NULL,'+254741999000','admin@taitatavetahealth.go.ke','SHA-021',1,NULL,NULL,NULL),
(18,'Kajiado County Referral Lab','lab','Kajiado Town','Kenya',NULL,'+254742111333','support@kajiadolab.go.ke','SHA-022',1,NULL,NULL,NULL),
(19,'Nyamira Specialist Hub','specialist','Nyamira CBD','Kenya',NULL,'+254743444555','hub@nyamiraspecialists.co.ke','SHA-023',1,NULL,NULL,NULL),
(20,'Migori Wellness Clinic','clinic','Migori Town','Kenya',NULL,'+254744666777','hello@migoriwellness.co.ke','SHA-024',0,NULL,NULL,NULL),
(21,'Turkana Desert Medical Centre','clinic','Lodwar, Turkana','Kenya',NULL,'+254745111222','info@turkanamedical.co.ke','SHA-025',1,NULL,NULL,NULL),
(22,'Baringo County Referral Lab','lab','Kabarnet Town','Kenya',NULL,'+254746333444','lab@baringocounty.go.ke','SHA-026',1,NULL,NULL,NULL),
(23,'Nyeri Highlands Specialist Hospital','specialist','Nyeri CBD','Kenya',NULL,'+254747555666','contact@nyerispecialist.co.ke','SHA-027',1,NULL,NULL,NULL),
(24,'Siaya Family Health Clinic','clinic','Siaya Town','Kenya',NULL,'+254748777888','hello@siayahealth.co.ke','SHA-028',0,NULL,NULL,NULL),
(25,'Narok Regional Hospital','hospital','Narok CBD','Kenya',NULL,'+254749999000','admin@narokregional.go.ke','SHA-029',1,NULL,NULL,NULL),
(26,'Tana River Diagnostic Lab','lab','Hola, Tana River','Kenya',NULL,'+254750111333','support@tanariverlab.co.ke','SHA-030',1,NULL,NULL,NULL),
(27,'Laikipia Specialist Hub','specialist','Nanyuki, Laikipia','Kenya',NULL,'+254751444555','hub@laikipiaspecialists.co.ke','SHA-031',1,NULL,NULL,NULL),
(28,'Kwale Coastal Wellness Clinic','clinic','Ukunda, Kwale','Kenya',NULL,'+254752666777','hello@kwalewellness.co.ke','SHA-032',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_facility_update
AFTER UPDATE ON facilities
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.fac_name != OLD.fac_name THEN
    SET change_summary = CONCAT(change_summary, 'Name changed from "', OLD.fac_name, '" to "', NEW.fac_name, '". ');
  END IF;

  IF NEW.fac_type != OLD.fac_type THEN
    SET change_summary = CONCAT(change_summary, 'Type changed from "', OLD.fac_type, '" to "', NEW.fac_type, '". ');
  END IF;

  IF NEW.location != OLD.location THEN
    SET change_summary = CONCAT(change_summary, 'Location changed from "', OLD.location, '" to "', NEW.location, '". ');
  END IF;

  IF NEW.country != OLD.country THEN
    SET change_summary = CONCAT(change_summary, 'Country changed from "', OLD.country, '" to "', NEW.country, '". ');
  END IF;

  IF NEW.fac_phone != OLD.fac_phone THEN
    SET change_summary = CONCAT(change_summary, 'Phone changed from "', OLD.fac_phone, '" to "', NEW.fac_phone, '". ');
  END IF;

  IF NEW.fac_email != OLD.fac_email THEN
    SET change_summary = CONCAT(change_summary, 'Email changed from "', OLD.fac_email, '" to "', NEW.fac_email, '". ');
  END IF;

  IF NEW.sha_code != OLD.sha_code THEN
    SET change_summary = CONCAT(change_summary, 'SHA code changed from "', OLD.sha_code, '" to "', NEW.sha_code, '". ');
  END IF;

  IF NEW.is_active != OLD.is_active THEN
    SET change_summary = CONCAT(change_summary, 'Active status changed from "', OLD.is_active, '" to "', NEW.is_active, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'facilities',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `labresults`
--

DROP TABLE IF EXISTS `labresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `labresults` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `labtech_id` int(11) DEFAULT NULL,
  `referral_id` int(11) DEFAULT NULL,
  `test_type` varchar(100) DEFAULT NULL,
  `results_summary` text DEFAULT NULL,
  `result_file_url` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Completed','Verified') DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `labtech_id` (`labtech_id`),
  CONSTRAINT `labresults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `labresults_ibfk_2` FOREIGN KEY (`labtech_id`) REFERENCES `labtechs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labresults`
--

LOCK TABLES `labresults` WRITE;
/*!40000 ALTER TABLE `labresults` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `labresults` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_labresult_insert
AFTER INSERT ON labresults
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'labresults',
    NEW.id,
    CONCAT('New lab result created for patient_id ', NEW.patient_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER check_compl 

BEFORE UPDATE ON labresults
FOR EACH ROW
BEGIN
IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN 
    SET NEW.completed_at = CURRENT_TIMESTAMP;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER check_ver
BEFORE UPDATE ON labresults
FOR EACH ROW
BEGIN
IF NEW.status = 'Verified' AND OLD.status =! 'Verified' THEN
    SET NEW.verified_at = CURRENT_TIMESTAMP;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_labresult_update
AFTER UPDATE ON labresults
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.status != OLD.status THEN
    SET change_summary = CONCAT(change_summary, 'Status changed from "', OLD.status, '" to "', NEW.status, '". ');
  END IF;

  IF NEW.test_type != OLD.test_type THEN
    SET change_summary = CONCAT(change_summary, 'Test type changed from "', OLD.test_type, '" to "', NEW.test_type, '". ');
  END IF;

  IF NEW.results_summary != OLD.results_summary THEN
    SET change_summary = CONCAT(change_summary, 'Results summary updated. ');
  END IF;

  IF NEW.result_file_url != OLD.result_file_url THEN
    SET change_summary = CONCAT(change_summary, 'Result file URL updated. ');
  END IF;

  IF NEW.labtech_id != OLD.labtech_id THEN
    SET change_summary = CONCAT(change_summary, 'Lab technician changed from "', OLD.labtech_id, '" to "', NEW.labtech_id, '". ');
  END IF;

  IF NEW.referral_id != OLD.referral_id THEN
    SET change_summary = CONCAT(change_summary, 'Referral ID changed from "', OLD.referral_id, '" to "', NEW.referral_id, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'labresults',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `labtechs`
--

DROP TABLE IF EXISTS `labtechs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `labtechs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `license_no` varchar(50) DEFAULT NULL,
  `qualification` enum('Diploma','BSc Medical lab') DEFAULT NULL,
  `speciality` varchar(100) DEFAULT NULL,
  `years_experience` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `license_no` (`license_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `labtechs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labtechs`
--

LOCK TABLES `labtechs` WRITE;
/*!40000 ALTER TABLE `labtechs` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `labtechs` VALUES
(3,28,'LAB-KE-2025-0098','BSc Medical lab','Microbiology',5,'2025-11-12 16:21:46','2025-11-12 16:21:46');
/*!40000 ALTER TABLE `labtechs` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_labtech_insert
AFTER INSERT ON labtechs
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'labtechs',
    NEW.id,
    CONCAT('New lab technician record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_labtech_update
AFTER UPDATE ON labtechs
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.license_no != OLD.license_no THEN
    SET change_summary = CONCAT(change_summary, 'License number changed. ');
  END IF;

  IF NEW.qualification != OLD.qualification THEN
    SET change_summary = CONCAT(change_summary, 'Qualification changed from "', OLD.qualification, '" to "', NEW.qualification, '". ');
  END IF;

  IF NEW.speciality != OLD.speciality THEN
    SET change_summary = CONCAT(change_summary, 'Speciality changed from "', OLD.speciality, '" to "', NEW.speciality, '". ');
  END IF;

  IF NEW.years_experience != OLD.years_experience THEN
    SET change_summary = CONCAT(change_summary, 'Years of experience changed from "', OLD.years_experience, '" to "', NEW.years_experience, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'labtechs',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `nurses`
--

DROP TABLE IF EXISTS `nurses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `cadre` enum('Enrolled Nurse','Registered Nurse') DEFAULT 'Enrolled Nurse',
  `qualification` enum('Diploma','BSc Nursing') DEFAULT NULL,
  `years_experience` int(11) NOT NULL,
  `is_specialist` tinyint(1) DEFAULT 0,
  `speciality` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `license_number` (`license_number`),
  CONSTRAINT `nurses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurses`
--

LOCK TABLES `nurses` WRITE;
/*!40000 ALTER TABLE `nurses` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `nurses` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_nurse_insert
AFTER INSERT ON nurses
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'nurses',
    NEW.id,
    CONCAT('New nurse record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_nurse_update
AFTER UPDATE ON nurses
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.license_number != OLD.license_number THEN
    SET change_summary = CONCAT(change_summary, 'License number changed. ');
  END IF;

  IF NEW.cadre != OLD.cadre THEN
    SET change_summary = CONCAT(change_summary, 'Cadre changed from "', OLD.cadre, '" to "', NEW.cadre, '". ');
  END IF;

  IF NEW.qualification != OLD.qualification THEN
    SET change_summary = CONCAT(change_summary, 'Qualification changed from "', OLD.qualification, '" to "', NEW.qualification, '". ');
  END IF;

  IF NEW.years_experience != OLD.years_experience THEN
    SET change_summary = CONCAT(change_summary, 'Years of experience changed from "', OLD.years_experience, '" to "', NEW.years_experience, '". ');
  END IF;

  IF NEW.is_specialist != OLD.is_specialist THEN
    SET change_summary = CONCAT(change_summary, 'Specialist status changed from "', OLD.is_specialist, '" to "', NEW.is_specialist, '". ');
  END IF;

  IF NEW.speciality != OLD.speciality THEN
    SET change_summary = CONCAT(change_summary, 'Speciality changed from "', OLD.speciality, '" to "', NEW.speciality, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'nurses',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `national_id` varchar(50) DEFAULT NULL,
  `blood_type` varchar(50) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `chronic_conditions` text DEFAULT NULL,
  `emergency_cont_name` varchar(100) DEFAULT NULL,
  `emergency_cont_phone` varchar(20) DEFAULT NULL,
  `is_insured` tinyint(1) DEFAULT 0,
  `insurance_type` enum('sha','minet','private','none') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER validate_insurance BEFORE INSERT ON patients
FOR EACH ROW
BEGIN
IF NEW.is_insured = FALSE AND NEW.insurance_type != 'none' THEN 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Insurance type must be none if not insured';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_patient_insert
AFTER INSERT ON patients
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'patients',
    NEW.id,
    CONCAT('New patient record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER validate_update_insurance BEFORE UPDATE ON patients
FOR EACH ROW
BEGIN
IF NEW.is_insured = FALSE AND NEW.insurance_type != 'none' THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Insurance type must be none if not insured';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_patient_update
AFTER UPDATE ON patients
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.national_id != OLD.national_id THEN
    SET change_summary = CONCAT(change_summary, 'National ID changed from "', OLD.national_id, '" to "', NEW.national_id, '". ');
  END IF;

  IF NEW.blood_type != OLD.blood_type THEN
    SET change_summary = CONCAT(change_summary, 'Blood type changed from "', OLD.blood_type, '" to "', NEW.blood_type, '". ');
  END IF;

  IF NEW.allergies != OLD.allergies THEN
    SET change_summary = CONCAT(change_summary, 'Allergies updated. ');
  END IF;

  IF NEW.chronic_conditions != OLD.chronic_conditions THEN
    SET change_summary = CONCAT(change_summary, 'Chronic conditions updated. ');
  END IF;

  IF NEW.emergency_cont_name != OLD.emergency_cont_name THEN
    SET change_summary = CONCAT(change_summary, 'Emergency contact name changed. ');
  END IF;

  IF NEW.emergency_cont_phone != OLD.emergency_cont_phone THEN
    SET change_summary = CONCAT(change_summary, 'Emergency contact phone changed. ');
  END IF;

  IF NEW.is_insured != OLD.is_insured THEN
    SET change_summary = CONCAT(change_summary, 'Insurance status changed from "', OLD.is_insured, '" to "', NEW.is_insured, '". ');
  END IF;

  IF NEW.insurance_type != OLD.insurance_type THEN
    SET change_summary = CONCAT(change_summary, 'Insurance type changed from "', OLD.insurance_type, '" to "', NEW.insurance_type, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'patients',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `referral_id` int(11) DEFAULT NULL,
  `amount` decimal(20,2) NOT NULL,
  `method` enum('cash','mpesa','insurance','bank','card') DEFAULT NULL,
  `insurance_type` enum('SHA','MINET','AON','Private','None') DEFAULT NULL,
  `is_covered` tinyint(1) DEFAULT 0,
  `tx_code` varchar(100) DEFAULT NULL,
  `status` enum('pending','paid','rejected','refunded') DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `refunded_at` timestamp NULL DEFAULT NULL,
  `rejected_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `referral_id` (`referral_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_payment_insert
AFTER INSERT ON payments
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'payments',
    NEW.id,
    CONCAT('New payment created for patient_id ', NEW.patient_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER paytime 
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    SET NEW.paid_at = CURRENT_TIMESTAMP;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER reftime 
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'refunded' AND OLD.status = 'paid' THEN
    SET NEW.refunded_at = CURRENT_TIMESTAMP;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER rject
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'rejected' AND OLD.status != 'rejected' THEN
    SET NEW.rejected_at = CURRENT_TIMESTAMP;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER valpay
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'refunded' AND OLD.status != 'paid' THEN
    SIGNAL SQLSTATE  '45000'
    SET MESSAGE_TEXT = 'Cannot refund a payment that wasnt paid';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_payment_update
AFTER UPDATE ON payments
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.status != OLD.status THEN
    SET change_summary = CONCAT(change_summary, 'Status changed from "', OLD.status, '" to "', NEW.status, '". ');
  END IF;

  IF NEW.amount != OLD.amount THEN
    SET change_summary = CONCAT(change_summary, 'Amount changed from "', OLD.amount, '" to "', NEW.amount, '". ');
  END IF;

  IF NEW.method != OLD.method THEN
    SET change_summary = CONCAT(change_summary, 'Payment method changed from "', OLD.method, '" to "', NEW.method, '". ');
  END IF;

  IF NEW.insurance_type != OLD.insurance_type THEN
    SET change_summary = CONCAT(change_summary, 'Insurance type changed from "', OLD.insurance_type, '" to "', NEW.insurance_type, '". ');
  END IF;

  IF NEW.is_covered != OLD.is_covered THEN
    SET change_summary = CONCAT(change_summary, 'Coverage status changed from "', OLD.is_covered, '" to "', NEW.is_covered, '". ');
  END IF;

  IF NEW.tx_code != OLD.tx_code THEN
    SET change_summary = CONCAT(change_summary, 'Transaction code updated. ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'payments',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `referral_notes`
--

DROP TABLE IF EXISTS `referral_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `referral_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referral_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `referral_id` (`referral_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `referral_notes_ibfk_1` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`id`),
  CONSTRAINT `referral_notes_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referral_notes`
--

LOCK TABLES `referral_notes` WRITE;
/*!40000 ALTER TABLE `referral_notes` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `referral_notes` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_referral_note_insert
AFTER INSERT ON referral_notes
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'referral_notes',
    NEW.id,
    CONCAT('New referral note added for referral_id ', NEW.referral_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_referral_note_update
AFTER UPDATE ON referral_notes
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.note != OLD.note THEN
    SET change_summary = 'Referral note updated.';
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'referral_notes',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `reffering_user_id` int(11) NOT NULL,
  `reffering_facility_id` int(11) NOT NULL,
  `receiving_facility_id` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `priority` enum('Routine','Urgent','Emergency') DEFAULT 'Routine',
  `referral_hash` varchar(255) DEFAULT NULL,
  `blockchain_tx_id` varchar(100) DEFAULT NULL,
  `status` enum('accepted','approved','tobeapproved','rejected','completed','processing','suspended') DEFAULT 'tobeapproved',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `req_date` datetime NOT NULL,
  `need_date` datetime DEFAULT NULL,
  `sched_date` datetime DEFAULT NULL,
  `visit_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `reffering_user_id` (`reffering_user_id`),
  KEY `reffering_facility_id` (`reffering_facility_id`),
  KEY `receiving_facility_id` (`receiving_facility_id`),
  KEY `rf_visits` (`visit_id`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`reffering_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `referrals_ibfk_3` FOREIGN KEY (`reffering_facility_id`) REFERENCES `facilities` (`id`),
  CONSTRAINT `referrals_ibfk_4` FOREIGN KEY (`receiving_facility_id`) REFERENCES `facilities` (`id`),
  CONSTRAINT `rf_visits` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrals`
--

LOCK TABLES `referrals` WRITE;
/*!40000 ALTER TABLE `referrals` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `referrals` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_referral_insert
AFTER INSERT ON referrals
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'referrals',
    NEW.id,
    CONCAT('New referral created for patient_id ', NEW.patient_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_referral_update
AFTER UPDATE ON referrals
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.status != OLD.status THEN
    SET change_summary = CONCAT(change_summary, 'Status changed from "', OLD.status, '" to "', NEW.status, '". ');
  END IF;

  IF NEW.priority != OLD.priority THEN
    SET change_summary = CONCAT(change_summary, 'Priority changed from "', OLD.priority, '" to "', NEW.priority, '". ');
  END IF;

  IF NEW.reason != OLD.reason THEN
    SET change_summary = CONCAT(change_summary, 'Reason updated. ');
  END IF;

  IF NEW.notes != OLD.notes THEN
    SET change_summary = CONCAT(change_summary, 'Notes updated. ');
  END IF;

  IF NEW.blockchain_tx_id != OLD.blockchain_tx_id THEN
    SET change_summary = CONCAT(change_summary, 'Blockchain transaction ID updated. ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'referrals',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `surgeons`
--

DROP TABLE IF EXISTS `surgeons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `surgeons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `years_experience` int(11) NOT NULL,
  `operating_facility_id` int(11) DEFAULT NULL,
  `is_consultant` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `license_number` (`license_number`),
  KEY `user_id` (`user_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `operating_facility_id` (`operating_facility_id`),
  CONSTRAINT `surgeons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `surgeons_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `surgeons_ibfk_3` FOREIGN KEY (`operating_facility_id`) REFERENCES `facilities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surgeons`
--

LOCK TABLES `surgeons` WRITE;
/*!40000 ALTER TABLE `surgeons` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `surgeons` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_surgeon_insert
AFTER INSERT ON surgeons
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'surgeons',
    NEW.id,
    CONCAT('New surgeon record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_surgeon_update
AFTER UPDATE ON surgeons
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.license_number != OLD.license_number THEN
    SET change_summary = CONCAT(change_summary, 'License number changed. ');
  END IF;

  IF NEW.qualification != OLD.qualification THEN
    SET change_summary = CONCAT(change_summary, 'Qualification changed from "', OLD.qualification, '" to "', NEW.qualification, '". ');
  END IF;

  IF NEW.years_experience != OLD.years_experience THEN
    SET change_summary = CONCAT(change_summary, 'Years of experience changed from "', OLD.years_experience, '" to "', NEW.years_experience, '". ');
  END IF;

  IF NEW.operating_facility_id != OLD.operating_facility_id THEN
    SET change_summary = CONCAT(change_summary, 'Operating facility changed from "', OLD.operating_facility_id, '" to "', NEW.operating_facility_id, '". ');
  END IF;

  IF NEW.is_consultant != OLD.is_consultant THEN
    SET change_summary = CONCAT(change_summary, 'Consultant status changed from "', OLD.is_consultant, '" to "', NEW.is_consultant, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, time_stamp)
    VALUES (
      @current_user_id,
      'update',
      'surgeons',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role` enum('doctor','nurse','patient','admin','iadmin','refmanager','refmanagertobe','assign','labtech') DEFAULT 'assign',
  `gender` enum('Male','Female','Bi-sexual','Lesbian','Homosexual','They/Them and other shenanigans') DEFAULT NULL,
  `dob` date NOT NULL,
  `age` int(11) DEFAULT NULL,
  `photo` longblob DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `facility_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT 0,
  `dis_res` varchar(500) DEFAULT 'Did something bad and account was dissabled',
  `no_dis` int(11) DEFAULT 0,
  `mime` varchar(50) DEFAULT '/image/jpeg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Test','User','testuser@example.com','+254700000000','$2b$10$WucPSPMbwjeCKsJOr486sutctbnTSD57HJWxQlFEaSEJtb4NMrUma','assign','Male','2005-02-13',20,NULL,0,NULL,'2025-10-13 14:16:26','2025-10-19 14:09:20',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(6,'Jane','Doe','janedoee@gmail.com','+254712645612','$2b$10$cWwvzkgqrXmlaxVVOmBlpeprG.kZ2SX4h29zV1BmccCY8tfUoASEC','refmanager','Female','1982-02-13',43,NULL,1,1,'2025-10-13 15:13:17','2025-10-27 17:11:34',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(7,'Judas','Iscariot','biggymatope@gmail.com','+254712440129','$2b$10$WucPSPMbwjeCKsJOr486sutctbnTSD57HJWxQlFEaSEJtb4NMrUma','admin','They/Them and other shenanigans','1975-02-13',50,NULL,1,1,'2025-10-13 15:19:26','2025-10-17 10:14:03',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(8,'John','Otieno','johnotieno@gmail.com','+254712345678','$2b$10$JyWWBi/fr.s6CmizRTI1uewn/MdVw3Fbdye/HXsGSdsRIgoMOiRm.','patient','They/Them and other shenanigans','1975-02-13',50,NULL,1,1,'2025-10-14 07:14:55','2025-10-14 07:14:55',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(11,'Ian','Otieno','ianotieno@gmail.com','+254712945345','$2b$10$/C7czEFbAhJ/Kxgwe5bzOOkS8LePpOSMVSv7ndbD61BvpNO4LvNsa','patient','They/Them and other shenanigans','1945-02-13',80,NULL,1,2,'2025-10-14 07:26:32','2025-10-24 14:23:19',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(26,'Cyril','Imbwaga','cyroimbwaga@gmail.com','+254712944632','$2b$10$fRWXxwWY95AiiZamrWGKWubPGGn7UB14SiqI5TmTZlV/1KOLxTEJu','refmanager','Male','1973-02-13',52,NULL,1,1,'2025-10-20 20:57:40','2025-10-24 13:38:33',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(27,'Timon','Opiyo','opiyotimon54@gmail.com','+254746154642','$2b$10$Ze8BcdfRlruIHV6HW3uTPOzCD0z9RQO7cchPPce.pRbCw0znpQ0PK','doctor','Male','2004-02-13',21,NULL,1,2,'2025-10-21 20:33:17','2025-10-21 20:33:17',0,'Did something bad and account was dissabled',0,'/image/jpeg'),
(28,'Brian','Marsello','bee2honey@protonmail.com','+2547125645678','$2b$10$plEJofcJkL5Opaww1Nn3V.8WUhpWRFuw7qrQ.8qzIKgD.QK4gJYeG','labtech','Male','1992-08-15',33,NULL,1,1,'2025-11-12 15:58:48','2025-11-12 16:01:54',0,'Did something bad and account was dissabled',0,'/image/jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'users',
    NEW.id,
    CONCAT('New user created: ', NEW.fname, ' ', NEW.lname, ' (Role: ', NEW.user_role, ')'),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_user_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.fname != OLD.fname THEN
    SET change_summary = CONCAT(change_summary, 'First name changed from "', OLD.fname, '" to "', NEW.fname, '". ');
  END IF;

  IF NEW.lname != OLD.lname THEN
    SET change_summary = CONCAT(change_summary, 'Last name changed from "', OLD.lname, '" to "', NEW.lname, '". ');
  END IF;

  IF NEW.email != OLD.email THEN
    SET change_summary = CONCAT(change_summary, 'Email changed from "', OLD.email, '" to "', NEW.email, '". ');
  END IF;

  IF NEW.phone != OLD.phone THEN
    SET change_summary = CONCAT(change_summary, 'Phone changed from "', OLD.phone, '" to "', NEW.phone, '". ');
  END IF;

  IF NEW.user_role != OLD.user_role THEN
    SET change_summary = CONCAT(change_summary, 'Role changed from "', OLD.user_role, '" to "', NEW.user_role, '". ');
  END IF;

  IF NEW.gender != OLD.gender THEN
    SET change_summary = CONCAT(change_summary, 'Gender changed from "', OLD.gender, '" to "', NEW.gender, '". ');
  END IF;

  IF NEW.dob != OLD.dob THEN
    SET change_summary = CONCAT(change_summary, 'Date of birth changed from "', OLD.dob, '" to "', NEW.dob, '". ');
  END IF;

  IF NEW.facility_id != OLD.facility_id THEN
    SET change_summary = CONCAT(change_summary, 'Facility changed from "', OLD.facility_id, '" to "', NEW.facility_id, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (user_id, action, target_table, target_id, description, timestamp)
    VALUES (
      @current_user_id,
      'update',
      'users',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `facility_id` int(11) DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL,
  `was_referred` tinyint(1) DEFAULT 0,
  `referred_patient` tinyint(1) DEFAULT 0,
  `visited_at` timestamp NULL DEFAULT current_timestamp(),
  `revisited_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `referral_id` int(11) DEFAULT NULL,
  `infacility` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `facility_id` (`facility_id`),
  KEY `server_id` (`server_id`),
  KEY `fk_visits` (`referral_id`),
  CONSTRAINT `fk_visits` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`id`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `visits_ibfk_2` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`),
  CONSTRAINT `visits_ibfk_3` FOREIGN KEY (`server_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_visit_insert
AFTER INSERT ON visits
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    target_table,
    target_id,
    description,
    time_stamp
  )
  VALUES (
    @current_user_id,
    'create',
    'visits',
    NEW.id,
    CONCAT('New visit logged for patient_id ', NEW.patient_id),
    CURRENT_TIMESTAMP
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER audit_visit_update
AFTER UPDATE ON visits
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';

  IF NEW.visit_date != OLD.visit_date THEN
    SET change_summary = CONCAT(change_summary, 'Visit date changed from "', OLD.visit_date, '" to "', NEW.visit_date, '". ');
  END IF;

  IF NEW.reason != OLD.reason THEN
    SET change_summary = CONCAT(change_summary, 'Visit reason updated. ');
  END IF;

  IF NEW.was_referred != OLD.was_referred THEN
    SET change_summary = CONCAT(change_summary, 'Referral status changed from "', OLD.was_referred, '" to "', NEW.was_referred, '". ');
  END IF;

  IF NEW.referred_patient != OLD.referred_patient THEN
    SET change_summary = CONCAT(change_summary, 'Patient referral flag changed from "', OLD.referred_patient, '" to "', NEW.referred_patient, '". ');
  END IF;

  IF NEW.facility_id != OLD.facility_id THEN
    SET change_summary = CONCAT(change_summary, 'Facility changed from "', OLD.facility_id, '" to "', NEW.facility_id, '". ');
  END IF;

  IF NEW.server_id != OLD.server_id THEN
    SET change_summary = CONCAT(change_summary, 'Server changed from "', OLD.server_id, '" to "', NEW.server_id, '". ');
  END IF;

  IF change_summary != '' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      target_table,
      target_id,
      description,
      time_stamp
    )
    VALUES (
      @current_user_id,
      'update',
      'visits',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'afyalink'
--

--
-- Dumping routines for database 'afyalink'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-11-18 23:29:48
