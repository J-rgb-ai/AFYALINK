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

-- Dump completed on 2025-10-06 11:23:29
/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mysql
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
-- Current Database: `mysql`
--

USE `mysql`;

--
-- Table structure for table `general_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `general_log` (
  `event_time` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_host` mediumtext NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `command_type` varchar(64) NOT NULL,
  `argument` mediumtext NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='General log';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `slow_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `slow_log` (
  `start_time` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_host` mediumtext NOT NULL,
  `query_time` time(6) NOT NULL,
  `lock_time` time(6) NOT NULL,
  `rows_sent` bigint(20) unsigned NOT NULL,
  `rows_examined` bigint(20) unsigned NOT NULL,
  `db` varchar(512) NOT NULL,
  `last_insert_id` int(11) NOT NULL,
  `insert_id` int(11) NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `sql_text` mediumtext NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL,
  `rows_affected` bigint(20) unsigned NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Slow log';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `column_stats`
--

DROP TABLE IF EXISTS `column_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `column_stats` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `column_name` varchar(64) NOT NULL,
  `min_value` varbinary(255) DEFAULT NULL,
  `max_value` varbinary(255) DEFAULT NULL,
  `nulls_ratio` decimal(12,4) DEFAULT NULL,
  `avg_length` decimal(12,4) DEFAULT NULL,
  `avg_frequency` decimal(12,4) DEFAULT NULL,
  `hist_size` tinyint(3) unsigned DEFAULT NULL,
  `hist_type` enum('SINGLE_PREC_HB','DOUBLE_PREC_HB','JSON_HB') DEFAULT NULL,
  `histogram` longblob DEFAULT NULL,
  PRIMARY KEY (`db_name`,`table_name`,`column_name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='Statistics on Columns';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `columns_priv`
--

DROP TABLE IF EXISTS `columns_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `columns_priv` (
  `Host` char(255) NOT NULL DEFAULT '',
  `Db` char(64) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Table_name` char(64) NOT NULL DEFAULT '',
  `Column_name` char(64) NOT NULL DEFAULT '',
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Column_priv` set('Select','Insert','Update','References') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`Host`,`Db`,`User`,`Table_name`,`Column_name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Column privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `db`
--

DROP TABLE IF EXISTS `db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `db` (
  `Host` char(255) NOT NULL DEFAULT '',
  `Db` char(64) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Select_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Insert_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Update_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Delete_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Create_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Drop_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Grant_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `References_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Index_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Alter_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Create_tmp_table_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Lock_tables_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Create_view_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Show_view_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Create_routine_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Alter_routine_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Execute_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Event_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Trigger_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Delete_history_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `Show_create_routine_priv` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`Host`,`Db`,`User`),
  KEY `User` (`User`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Database privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `db` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `name` char(64) NOT NULL DEFAULT '',
  `body` longblob NOT NULL,
  `definer` varchar(384) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `execute_at` datetime DEFAULT NULL,
  `interval_value` int(11) DEFAULT NULL,
  `interval_field` enum('YEAR','QUARTER','MONTH','DAY','HOUR','MINUTE','WEEK','SECOND','MICROSECOND','YEAR_MONTH','DAY_HOUR','DAY_MINUTE','DAY_SECOND','HOUR_MINUTE','HOUR_SECOND','MINUTE_SECOND','DAY_MICROSECOND','HOUR_MICROSECOND','MINUTE_MICROSECOND','SECOND_MICROSECOND') DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_executed` datetime DEFAULT NULL,
  `starts` datetime DEFAULT NULL,
  `ends` datetime DEFAULT NULL,
  `status` enum('ENABLED','DISABLED','SLAVESIDE_DISABLED') NOT NULL DEFAULT 'ENABLED',
  `on_completion` enum('DROP','PRESERVE') NOT NULL DEFAULT 'DROP',
  `sql_mode` set('REAL_AS_FLOAT','PIPES_AS_CONCAT','ANSI_QUOTES','IGNORE_SPACE','IGNORE_BAD_TABLE_OPTIONS','ONLY_FULL_GROUP_BY','NO_UNSIGNED_SUBTRACTION','NO_DIR_IN_CREATE','POSTGRESQL','ORACLE','MSSQL','DB2','MAXDB','NO_KEY_OPTIONS','NO_TABLE_OPTIONS','NO_FIELD_OPTIONS','MYSQL323','MYSQL40','ANSI','NO_AUTO_VALUE_ON_ZERO','NO_BACKSLASH_ESCAPES','STRICT_TRANS_TABLES','STRICT_ALL_TABLES','NO_ZERO_IN_DATE','NO_ZERO_DATE','INVALID_DATES','ERROR_FOR_DIVISION_BY_ZERO','TRADITIONAL','NO_AUTO_CREATE_USER','HIGH_NOT_PRECEDENCE','NO_ENGINE_SUBSTITUTION','PAD_CHAR_TO_FULL_LENGTH','EMPTY_STRING_IS_NULL','SIMULTANEOUS_ASSIGNMENT','TIME_ROUND_FRACTIONAL') NOT NULL DEFAULT '',
  `comment` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `originator` int(10) unsigned NOT NULL,
  `time_zone` char(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'SYSTEM',
  `character_set_client` char(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `collation_connection` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `db_collation` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `body_utf8` longblob DEFAULT NULL,
  PRIMARY KEY (`db`,`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Events';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `func`
--

DROP TABLE IF EXISTS `func`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `func` (
  `name` char(64) NOT NULL DEFAULT '',
  `ret` tinyint(1) NOT NULL DEFAULT 0,
  `dl` char(128) NOT NULL DEFAULT '',
  `type` enum('function','aggregate') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='User defined functions';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `global_priv`
--

DROP TABLE IF EXISTS `global_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `global_priv` (
  `Host` char(255) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Priv` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`Priv`)),
  PRIMARY KEY (`Host`,`User`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Users and global privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtid_slave_pos`
--

DROP TABLE IF EXISTS `gtid_slave_pos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gtid_slave_pos` (
  `domain_id` int(10) unsigned NOT NULL,
  `sub_id` bigint(20) unsigned NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `seq_no` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`domain_id`,`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Replication slave GTID position';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `help_category`
--

DROP TABLE IF EXISTS `help_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_category` (
  `help_category_id` smallint(5) unsigned NOT NULL,
  `name` char(64) NOT NULL,
  `parent_category_id` smallint(5) unsigned DEFAULT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`help_category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='help categories';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `help_keyword`
--

DROP TABLE IF EXISTS `help_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_keyword` (
  `help_keyword_id` int(10) unsigned NOT NULL,
  `name` char(64) NOT NULL,
  PRIMARY KEY (`help_keyword_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='help keywords';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `help_relation`
--

DROP TABLE IF EXISTS `help_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_relation` (
  `help_topic_id` int(10) unsigned NOT NULL,
  `help_keyword_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`help_keyword_id`,`help_topic_id`),
  KEY `help_topic_id` (`help_topic_id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='keyword-topic relation';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `help_topic`
--

DROP TABLE IF EXISTS `help_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_topic` (
  `help_topic_id` int(10) unsigned NOT NULL,
  `name` char(64) NOT NULL,
  `help_category_id` smallint(5) unsigned NOT NULL,
  `description` text NOT NULL,
  `example` text NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`help_topic_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='help topics';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `index_stats`
--

DROP TABLE IF EXISTS `index_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `index_stats` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `index_name` varchar(64) NOT NULL,
  `prefix_arity` int(11) unsigned NOT NULL,
  `avg_frequency` decimal(12,4) DEFAULT NULL,
  PRIMARY KEY (`db_name`,`table_name`,`index_name`,`prefix_arity`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='Statistics on Indexes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `innodb_index_stats`
--

DROP TABLE IF EXISTS `innodb_index_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `innodb_index_stats` (
  `database_name` varchar(64) NOT NULL,
  `table_name` varchar(199) NOT NULL,
  `index_name` varchar(64) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stat_name` varchar(64) NOT NULL,
  `stat_value` bigint(20) unsigned NOT NULL,
  `sample_size` bigint(20) unsigned DEFAULT NULL,
  `stat_description` varchar(1024) NOT NULL,
  PRIMARY KEY (`database_name`,`table_name`,`index_name`,`stat_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin STATS_PERSISTENT=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `innodb_table_stats`
--

DROP TABLE IF EXISTS `innodb_table_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `innodb_table_stats` (
  `database_name` varchar(64) NOT NULL,
  `table_name` varchar(199) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `n_rows` bigint(20) unsigned NOT NULL,
  `clustered_index_size` bigint(20) unsigned NOT NULL,
  `sum_of_other_index_sizes` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`database_name`,`table_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin STATS_PERSISTENT=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `plugin`
--

DROP TABLE IF EXISTS `plugin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `plugin` (
  `name` varchar(64) NOT NULL DEFAULT '',
  `dl` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='MySQL plugins';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proc`
--

DROP TABLE IF EXISTS `proc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proc` (
  `db` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `name` char(64) NOT NULL DEFAULT '',
  `type` enum('FUNCTION','PROCEDURE','PACKAGE','PACKAGE BODY') NOT NULL,
  `specific_name` char(64) NOT NULL DEFAULT '',
  `language` enum('SQL') NOT NULL DEFAULT 'SQL',
  `sql_data_access` enum('CONTAINS_SQL','NO_SQL','READS_SQL_DATA','MODIFIES_SQL_DATA') NOT NULL DEFAULT 'CONTAINS_SQL',
  `is_deterministic` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `security_type` enum('INVOKER','DEFINER') NOT NULL DEFAULT 'DEFINER',
  `param_list` blob NOT NULL,
  `returns` longblob NOT NULL,
  `body` longblob NOT NULL,
  `definer` varchar(384) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `sql_mode` set('REAL_AS_FLOAT','PIPES_AS_CONCAT','ANSI_QUOTES','IGNORE_SPACE','IGNORE_BAD_TABLE_OPTIONS','ONLY_FULL_GROUP_BY','NO_UNSIGNED_SUBTRACTION','NO_DIR_IN_CREATE','POSTGRESQL','ORACLE','MSSQL','DB2','MAXDB','NO_KEY_OPTIONS','NO_TABLE_OPTIONS','NO_FIELD_OPTIONS','MYSQL323','MYSQL40','ANSI','NO_AUTO_VALUE_ON_ZERO','NO_BACKSLASH_ESCAPES','STRICT_TRANS_TABLES','STRICT_ALL_TABLES','NO_ZERO_IN_DATE','NO_ZERO_DATE','INVALID_DATES','ERROR_FOR_DIVISION_BY_ZERO','TRADITIONAL','NO_AUTO_CREATE_USER','HIGH_NOT_PRECEDENCE','NO_ENGINE_SUBSTITUTION','PAD_CHAR_TO_FULL_LENGTH','EMPTY_STRING_IS_NULL','SIMULTANEOUS_ASSIGNMENT','TIME_ROUND_FRACTIONAL') NOT NULL DEFAULT '',
  `comment` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `character_set_client` char(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `collation_connection` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `db_collation` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `body_utf8` longblob DEFAULT NULL,
  `aggregate` enum('NONE','GROUP') NOT NULL DEFAULT 'NONE',
  PRIMARY KEY (`db`,`name`,`type`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Stored Procedures';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `procs_priv`
--

DROP TABLE IF EXISTS `procs_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `procs_priv` (
  `Host` char(255) NOT NULL DEFAULT '',
  `Db` char(64) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Routine_name` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `Routine_type` enum('FUNCTION','PROCEDURE','PACKAGE','PACKAGE BODY') NOT NULL,
  `Grantor` varchar(384) NOT NULL DEFAULT '',
  `Proc_priv` set('Execute','Alter Routine','Grant','Show Create Routine') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Host`,`Db`,`User`,`Routine_name`,`Routine_type`),
  KEY `Grantor` (`Grantor`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Procedure privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proxies_priv`
--

DROP TABLE IF EXISTS `proxies_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proxies_priv` (
  `Host` char(255) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Proxied_host` char(255) NOT NULL DEFAULT '',
  `Proxied_user` char(128) NOT NULL DEFAULT '',
  `With_grant` tinyint(1) NOT NULL DEFAULT 0,
  `Grantor` varchar(384) NOT NULL DEFAULT '',
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Host`,`User`,`Proxied_host`,`Proxied_user`),
  KEY `Grantor` (`Grantor`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='User proxy privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles_mapping`
--

DROP TABLE IF EXISTS `roles_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_mapping` (
  `Host` char(255) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Role` char(128) NOT NULL DEFAULT '',
  `Admin_option` enum('N','Y') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  UNIQUE KEY `Host` (`Host`,`User`,`Role`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Granted roles';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `servers`
--

DROP TABLE IF EXISTS `servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `servers` (
  `Server_name` char(64) NOT NULL DEFAULT '',
  `Host` varchar(2048) NOT NULL DEFAULT '',
  `Db` char(64) NOT NULL DEFAULT '',
  `Username` char(128) NOT NULL DEFAULT '',
  `Password` char(64) NOT NULL DEFAULT '',
  `Port` int(4) NOT NULL DEFAULT 0,
  `Socket` char(108) NOT NULL DEFAULT '',
  `Wrapper` char(64) NOT NULL DEFAULT '',
  `Owner` varchar(512) NOT NULL DEFAULT '',
  `Options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`Options`)),
  PRIMARY KEY (`Server_name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='MySQL Foreign Servers table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_stats`
--

DROP TABLE IF EXISTS `table_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_stats` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `cardinality` bigint(21) unsigned DEFAULT NULL,
  PRIMARY KEY (`db_name`,`table_name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=0 COMMENT='Statistics on Tables';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tables_priv`
--

DROP TABLE IF EXISTS `tables_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables_priv` (
  `Host` char(255) NOT NULL DEFAULT '',
  `Db` char(64) NOT NULL DEFAULT '',
  `User` char(128) NOT NULL DEFAULT '',
  `Table_name` char(64) NOT NULL DEFAULT '',
  `Grantor` varchar(384) NOT NULL DEFAULT '',
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Table_priv` set('Select','Insert','Update','Delete','Create','Drop','Grant','References','Index','Alter','Create View','Show view','Trigger','Delete versioning rows') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `Column_priv` set('Select','Insert','Update','References') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`Host`,`Db`,`User`,`Table_name`),
  KEY `Grantor` (`Grantor`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Table privileges';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_zone`
--

DROP TABLE IF EXISTS `time_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone` (
  `Time_zone_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Use_leap_seconds` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`Time_zone_id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Time zones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_zone_leap_second`
--

DROP TABLE IF EXISTS `time_zone_leap_second`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone_leap_second` (
  `Transition_time` bigint(20) NOT NULL,
  `Correction` int(11) NOT NULL,
  PRIMARY KEY (`Transition_time`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Leap seconds information for time zones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_zone_name`
--

DROP TABLE IF EXISTS `time_zone_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone_name` (
  `Name` char(64) NOT NULL,
  `Time_zone_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Time zone names';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_zone_transition`
--

DROP TABLE IF EXISTS `time_zone_transition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone_transition` (
  `Time_zone_id` int(10) unsigned NOT NULL,
  `Transition_time` bigint(20) NOT NULL,
  `Transition_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Time_zone_id`,`Transition_time`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Time zone transitions';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_zone_transition_type`
--

DROP TABLE IF EXISTS `time_zone_transition_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone_transition_type` (
  `Time_zone_id` int(10) unsigned NOT NULL,
  `Transition_type_id` int(10) unsigned NOT NULL,
  `Offset` int(11) NOT NULL DEFAULT 0,
  `Is_DST` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `Abbreviation` char(8) NOT NULL DEFAULT '',
  PRIMARY KEY (`Time_zone_id`,`Transition_type_id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1 TRANSACTIONAL=1 COMMENT='Time zone transition types';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `user`
--

DROP TABLE IF EXISTS `user`;
/*!50001 DROP VIEW IF EXISTS `user`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `user` AS SELECT
 1 AS `Host`,
  1 AS `User`,
  1 AS `Password`,
  1 AS `Select_priv`,
  1 AS `Insert_priv`,
  1 AS `Update_priv`,
  1 AS `Delete_priv`,
  1 AS `Create_priv`,
  1 AS `Drop_priv`,
  1 AS `Reload_priv`,
  1 AS `Shutdown_priv`,
  1 AS `Process_priv`,
  1 AS `File_priv`,
  1 AS `Grant_priv`,
  1 AS `References_priv`,
  1 AS `Index_priv`,
  1 AS `Alter_priv`,
  1 AS `Show_db_priv`,
  1 AS `Super_priv`,
  1 AS `Create_tmp_table_priv`,
  1 AS `Lock_tables_priv`,
  1 AS `Execute_priv`,
  1 AS `Repl_slave_priv`,
  1 AS `Repl_client_priv`,
  1 AS `Create_view_priv`,
  1 AS `Show_view_priv`,
  1 AS `Create_routine_priv`,
  1 AS `Alter_routine_priv`,
  1 AS `Create_user_priv`,
  1 AS `Event_priv`,
  1 AS `Trigger_priv`,
  1 AS `Create_tablespace_priv`,
  1 AS `Delete_history_priv`,
  1 AS `ssl_type`,
  1 AS `ssl_cipher`,
  1 AS `x509_issuer`,
  1 AS `x509_subject`,
  1 AS `max_questions`,
  1 AS `max_updates`,
  1 AS `max_connections`,
  1 AS `max_user_connections`,
  1 AS `plugin`,
  1 AS `authentication_string`,
  1 AS `password_expired`,
  1 AS `is_role`,
  1 AS `default_role`,
  1 AS `max_statement_time` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `transaction_registry`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `transaction_registry` (
  `transaction_id` bigint(20) unsigned NOT NULL,
  `commit_id` bigint(20) unsigned NOT NULL,
  `begin_timestamp` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `commit_timestamp` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `isolation_level` enum('READ-UNCOMMITTED','READ-COMMITTED','REPEATABLE-READ','SERIALIZABLE') NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `commit_id` (`commit_id`),
  KEY `begin_timestamp` (`begin_timestamp`),
  KEY `commit_timestamp` (`commit_timestamp`,`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin STATS_PERSISTENT=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Current Database: `mysql`
--

USE `mysql`;

--
-- Final view structure for view `user`
--

/*!50001 DROP VIEW IF EXISTS `user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`mariadb.sys`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user` AS select `global_priv`.`Host` AS `Host`,`global_priv`.`User` AS `User`,if(json_value(`global_priv`.`Priv`,'$.plugin') in ('mysql_native_password','mysql_old_password'),ifnull(json_value(`global_priv`.`Priv`,'$.authentication_string'),''),'') AS `Password`,if(json_value(`global_priv`.`Priv`,'$.access') & 1,'Y','N') AS `Select_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 2,'Y','N') AS `Insert_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 4,'Y','N') AS `Update_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 8,'Y','N') AS `Delete_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 16,'Y','N') AS `Create_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 32,'Y','N') AS `Drop_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 64,'Y','N') AS `Reload_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 128,'Y','N') AS `Shutdown_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 256,'Y','N') AS `Process_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 512,'Y','N') AS `File_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 1024,'Y','N') AS `Grant_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 2048,'Y','N') AS `References_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 4096,'Y','N') AS `Index_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 8192,'Y','N') AS `Alter_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 16384,'Y','N') AS `Show_db_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 32768,'Y','N') AS `Super_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 65536,'Y','N') AS `Create_tmp_table_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 131072,'Y','N') AS `Lock_tables_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 262144,'Y','N') AS `Execute_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 524288,'Y','N') AS `Repl_slave_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 1048576,'Y','N') AS `Repl_client_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 2097152,'Y','N') AS `Create_view_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 4194304,'Y','N') AS `Show_view_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 8388608,'Y','N') AS `Create_routine_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 16777216,'Y','N') AS `Alter_routine_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 33554432,'Y','N') AS `Create_user_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 67108864,'Y','N') AS `Event_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 134217728,'Y','N') AS `Trigger_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 268435456,'Y','N') AS `Create_tablespace_priv`,if(json_value(`global_priv`.`Priv`,'$.access') & 536870912,'Y','N') AS `Delete_history_priv`,elt(ifnull(json_value(`global_priv`.`Priv`,'$.ssl_type'),0) + 1,'','ANY','X509','SPECIFIED') AS `ssl_type`,ifnull(json_value(`global_priv`.`Priv`,'$.ssl_cipher'),'') AS `ssl_cipher`,ifnull(json_value(`global_priv`.`Priv`,'$.x509_issuer'),'') AS `x509_issuer`,ifnull(json_value(`global_priv`.`Priv`,'$.x509_subject'),'') AS `x509_subject`,cast(ifnull(json_value(`global_priv`.`Priv`,'$.max_questions'),0) as unsigned) AS `max_questions`,cast(ifnull(json_value(`global_priv`.`Priv`,'$.max_updates'),0) as unsigned) AS `max_updates`,cast(ifnull(json_value(`global_priv`.`Priv`,'$.max_connections'),0) as unsigned) AS `max_connections`,cast(ifnull(json_value(`global_priv`.`Priv`,'$.max_user_connections'),0) as signed) AS `max_user_connections`,ifnull(json_value(`global_priv`.`Priv`,'$.plugin'),'') AS `plugin`,ifnull(json_value(`global_priv`.`Priv`,'$.authentication_string'),'') AS `authentication_string`,if(ifnull(json_value(`global_priv`.`Priv`,'$.password_last_changed'),1) = 0,'Y','N') AS `password_expired`,elt(ifnull(json_value(`global_priv`.`Priv`,'$.is_role'),0) + 1,'N','Y') AS `is_role`,ifnull(json_value(`global_priv`.`Priv`,'$.default_role'),'') AS `default_role`,cast(ifnull(json_value(`global_priv`.`Priv`,'$.max_statement_time'),0.0) as decimal(12,6)) AS `max_statement_time` from `global_priv` */;
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
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-10-06 11:30:08
