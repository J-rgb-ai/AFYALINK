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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
set autocommit=0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
set autocommit=0;
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
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
set autocommit=0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labtechs`
--

LOCK TABLES `labtechs` WRITE;
/*!40000 ALTER TABLE `labtechs` DISABLE KEYS */;
set autocommit=0;
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
  `status` enum('sent','received','accepted','completed','rejected') DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `reffering_user_id` (`reffering_user_id`),
  KEY `reffering_facility_id` (`reffering_facility_id`),
  KEY `receiving_facility_id` (`receiving_facility_id`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`reffering_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `referrals_ibfk_3` FOREIGN KEY (`reffering_facility_id`) REFERENCES `facilities` (`id`),
  CONSTRAINT `referrals_ibfk_4` FOREIGN KEY (`receiving_facility_id`) REFERENCES `facilities` (`id`)
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
  `user_role` enum('doctor','nurse','patient','admin') DEFAULT 'patient',
  `gender` enum('Male','Female','Bi-sexual','Lesbian','Homosexual','They/Them and other shenanigans') DEFAULT NULL,
  `dob` date NOT NULL,
  `age` int(11) DEFAULT NULL,
  `photo` longblob DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `facility_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
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
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `facility_id` (`facility_id`),
  KEY `server_id` (`server_id`),
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-10-06 11:18:10
