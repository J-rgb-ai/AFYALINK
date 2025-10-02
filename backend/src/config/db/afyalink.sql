
CREATE DATABASE afyalink1;

USE afyalink1;

--user creaation

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'StrongAdminPassmwad!';
CREATE USER 'doctor'@'localhost' IDENTIFIED BY 'StrongDoctorPass!';
CREATE USER 'nurse'@'localhost' IDENTIFIED BY 'StrongNursePasswad';
CREATE USER 'surgeon'@'localhost' IDENTIFIED BY 'StrongSurgeonPass!';
CREATE USER 'labtech'@'localhost' IDENTIFIED BY 'LabtechPass!';
CREATE USER 'accounts_clerk'@'localhost' IDENTIFIED BY 'lerkPass!';
CREATE USER 'referral_mgr'@'localhost' IDENTIFIED BY 'StrongReferralPass!';
CREATE USER 'secretary'@'localhost' IDENTIFIED BY 'weakahhassrPass!';


--ignore

--GRANT ALL PRIVILEDGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
--FLUSH PRIVILEDGES;

--GRANT SELECT ON afyalink.* TO 'reader'@'localhost';
--FLUSH PRIVILEDGES;

--GRANT INSERT, UPDATE, DELETE ON afyalink.* TO 'write'@'localhost';
--FLUSH PRIVILEDGES;


--ANT ALL PRIVILEGES ON afyalink.* TO admin;

--USH PRIVILEGES;

--achana nayo kabsaa


--roles

CREATE ROLE 'admin_role';
CREATE ROLE 'doctor_role';
CREATE ROLE 'nurse_role';
CREATE ROLE 'surgeon_role';
CREATE ROLE "labtech_role";
CREATE ROLE 'accounts_clerk_role';
CREATE ROLE 'reader_role';
CREATE ROLE 'secretary_role';
CREATE ROLE 'referral_manager_role';

GRANT ALL PRIVILEGES ON *.* TO 'admin_role' WITH GRANT OPTION;


--doktariii

GRANT SELECT, INSERT, UPDATE ON afyalink.users TO 'doctor_role';
GRANT SELECT, INSERT, UPDATE ON afyalink.patients TO 'doctor_role';
GRANT SELECT, INSERT, UPDATE ON afyalink.referrals TO 'doctor_role';
GRANT SELECT, INSERT, UPDATE ON afyalink.referral_notes TO 'doctor_role';
GRANT SELECT ON afyalink.labresults TO 'doctor_role';
GRANT SELECT, INSERT ON  afyalink.visits TO 'doctor_role';


--nurse

GRANT SELECT, INSERT, UPDATE ON afyalink.users TO 'nurse_role';
GRANT SELECT, INSERT, UPDATE ON afyalink.patients TO 'nurse_role';
GRANT SELECT, INSERT ON afyalink.referrals TO 'nurse_role';
GRANT SELECT, INSERT ON afyalink.referral_notes TO 'nurse_role';
GRANT SELECT, INSERT ON afyalink.visits TO 'nurse_role';


--sajion
GRANT SELECT, INSERT, UPDATE ON afyalink.surgeons TO 'surgeon_role';
GRANT SELECT ON afyalink.referrals TO 'surgeon_role';
GRANT SELECT, INSERT ON afyalink.referral_notes TO 'surgeon_role';
GRANT SELECT ON afyalink.patients TO 'surgeon_role';
GRANT SELECT, INSERT ON afyalink.visits TO 'surgeon_role';



--labtech

GRANT SELECT, INSERT, UPDATE ON afyalink.labresults TO 'labtech_role';
GRANT SELECT ON afyalink.patients TO 'labtech_role';
GRANT SELECT ON afyalink.referrals TO 'labtech_role';
GRANT SELECT ON afyalink.visits TO 'labtech_role';


--akaunts klak
GRANT SELECT ON afyalink.patients TO 'accounts_clerk_role';
GRANT SELECT ON afyalink.referrals TO 'accounts_clerk_role';
GRANT SELECT,INSERT,UPDATE ON afyalink.payments TO 'accounts_clerk_role';
GRANT SELECT ON afyalink.audit_log TO 'accounts_clerk_role';




--secretary


GRANT SELECT,INSERT ON afyalink.* TO 'secretary_role';



--ref manager

GRANT SELECT, INSERT, UPDATE ON afyalink.referrals TO 'referral_manager_role';
GRANT SELECT, INSERT, UPDATE ON afyalink.referral_notes TO 'referral_manager_role';
GRANT SELECT ON afyalink.patients TO 'referral_manager_role';
GRANT SELECT ON afyalink.facilities TO 'referral_manager_role';
GRANT SELECT ON afyalink.users TO 'referral_manager_role';


--give roles


GRANT 'admin_role' TO 'admin'@'localhost';
GRANT 'doctor_role' TO 'doctor'@'localhost';
GRANT 'nurse_role' TO 'nurse'@'localhost';
GRANT 'surgeon_role' TO 'surgeon'@'localhost';
GRANT 'labtech_role' TO 'labtech'@'localhost';
GRANT 'accounts_clerk_role' TO 'accounts_clerk'@'localhost';
GRANT 'referral_manager_role' TO 'referral_mgr'@'localhost';
GRANT 'secretary_role' TO 'secretary'@'localhost';

--default roles 


SET DEFAULT ROLE 'admin_role' TO 'admin'@'localhost';
SET DEFAULT ROLE 'doctor_role' TO 'doctor'@'localhost';
SET DEFAULT ROLE 'nurse_role' TO 'nurse'@'localhost';
SET DEFAULT ROLE 'surgeon_role' TO 'surgeon'@'localhost';
SET DEFAULT ROLE 'labtech_role' TO 'labtech'@'localhost';
SET DEFAULT ROLE 'accounts_clerk_role' TO 'accounts_clerk'@'localhost';
SET DEFAULT ROLE 'referral_manager_role' TO 'referral_mgr'@'localhost';
SET DEFAULT ROLE 'secretary_role' TO 'secretary'@'localhost';


--facilites
CREATE TABLE facilities(
id INT AUTO_INCREMENT PRIMARY KEY,
fac_name VARCHAR(100) NOT NULL,
fac_type ENUM('clinic','hospital','lab','specialist') DEFAULT 'hospital',
location VARCHAR(100) NOT NULL,
country VARCHAR(100) NOT NULL,
photo LONGBLOB,
fac_phone VARCHAR(20),
fac_email VARCHAR(100),
sha_code VARCHAR(50),
is_active BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);


--users 
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE,
phone VARCHAR(20)  UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
user_role ENUM('doctor','nurse','patient','admin') DEFAULT 'patient',
gender ENUM('Male','Female','Bi-sexual','Lesbian','Homosexual','They/Them and other shenanigans'),
dob DATE NOT NULL,
age INT  AS(TIMESTAMPDIFF(YEAR,dob,CURDATE())) STORED,
photo LONGBLOB, 
is_verified BOOLEAN DEFAULT FALSE,
facility_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (facility_id) REFERENCES facilities(id)



);


--also depratment table a late arrival could loose significance though

CREATE TABLE departments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name ENUM('support staff','IT','Nursing','Clinical','Special'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




--staff table..just added..could remove it later maybe idk
--staff and dept table hazna relationships mob coz planning to get rid of em in future maybe

--staff

CREATE TABLE staff(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    department_id  INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);





--patients

CREATE TABLE patients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    national_id VARCHAR(50),
    blood_type VARCHAR(50) , --ITAKUA ENUM
    allergies TEXT,
    chronic_conditions TEXT,
    emergency_cont_name VARCHAR(100),
    emergency_cont_phone VARCHAR(20),
    is_insured BOOLEAN DEFAULT FALSE,
    insurance_type ENUM('sha','minet','private','none'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)


);

--insurance check trigger to ensure that msee haezi eka insurance type kaa is insured ni false

DELIMITER //

CREATE TRIGGER validate_insurance BEFORE INSERT ON patients
FOR EACH ROW
BEGIN
IF NEW.is_insured = FALSE AND NEW.insurance_type != 'none' THEN 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT 'Insurance type must be none if not insured';
END IF;
END;
//
DELIMITER;


DELIMITER //

CREATE TRIGGER validate_update_insurance BEFORE UPDATE ON patients
FOR EACH ROW
BEGIN
IF NEW.is_insured = FALSE AND NEW.insurance_type != 'none' THEN
SIGNAL SQLSTATE '45000'
SET MESSSAGE_TEXT 'Insurance type must be none if not insured';
END IF;
END;
//
DELIMITER;


--doctorssss

CREATE TABLE doctors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    license_number VARCHAR(50) UNIQUE,
    is_specialist BOOLEAN DEFAULT FALSE,
    speciality VARCHAR(100),
    qualification VARCHAR(100), --LATER CHANGE TO ENUM
    years_experience INT NOT NULL,
    is_consultant BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)

);

--sajionssssssssssssssssss

CREATE TABLE surgeons(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    doctor_id INT,
    license_number VARCHAR(50) UNIQUE,
    qualification VARCHAR(100),
    years_experience INT NOT NULL,
    operating_facility_id INT,
    is_consultant BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    -- no need for this like italeta tu issue FOREIGN KEY (license_number) REFERENCES doctors(license_number),
    FOREIGN KEY (operating_facility_id) REFERENCES facilites(id)


);

--nurses
CREATE TABLE nurses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    license_number VARCHAR(50) UNIQUE,
    cadre ENUM('Enrolled Nurse','Registered Nurse') DEFAULT 'Enrolled Nurse',
    qualification ENUM('Diploma','BSc Nursing'),
    years_experience INT NOT NULL,
    is_specialist BOOLEAN DEFAULT FALSE,
    speciality VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

--labtechs or idk whatever they call em'

CREATE TABLE labtechs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    license_no VARCHAR(50) UNIQUE,
    qualification ENUM('Diploma','BSc Medical lab'),
    speciality VARCHAR(100), --taeka enum badae
    years_experience INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);





-- hii space ni ya nn nmesahau adi





--referrals

CREATE TABLE referrals(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    patient_id INT NOT NULL,
    reffering_user_id INT NOT NULL, --doc or nurse doing the refferalss
    reffering_facility_id INT NOT NULL, --facility penye ametokaa
    receiving_facility_id INT NOT NULL, --facility anaendaaaa
    reason TEXT,
    priority ENUM('Routine','Urgent','Emergency') DEFAULT 'Routine',
    referral_hash VARCHAR(255), --hash or referal payload on the chain
    blockchain_tx_id VARCHAR(100), --blockchain trancation id
    status ENUM('sent','received','accepted','completed','rejected'),
    notes TEXT, --Maoni ya docky
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (reffering_user_id) REFERENCES users(id),
    FOREIGN KEY (reffering_facility_id) REFERENCES facilities(id),
    FOREIGN KEY (receiving_facility_id) REFERENCES facilities(id)
    

);


CREATE TABLE referral_notes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    referral_id INT NOT NULL,
    author_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (refferal_id) REFERENCES referrals(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);


--chainlogs
CREATE TABLE blockchain_log(
    id INT AUTO_INCREMENT PRIMARY KEY,
    referral_id INT,
    tx_id VARCHAR(100),
    status ENUM('pending','confirmed','failed') DEFAULT 'pending',
    err_mess TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (referral_id) REFERENCES referrals(id)
);


--patient visits
CREATE TABLE visits(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    facility_id INT,
    visit_date DATE,
    reason TEXT,
    served_by_userId INT,
    was_referred BOOLEAN DEFAULT FALSE,
    referred_patient BOOLEAN DEFAULT FALSE,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revisited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY (facility_id) REFERENCES facilities(id),
    FOREIGN KEY (server_id) REFERENCES users(id)
);


CREATE TABLE labresults(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    labtech_id INT,
    referral_id INT,
    test_type VARCHAR(100), --e.g kaswende
    results_summary TEXT,
    result_file_url VARCHAR(255),
    status ENUM('Pending','Completed','Verified'),
    verified_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY(labtech_id) REFERENCES labtechs(id)
);

--completed trigger

DELIMITER //

CREATE TRIGGER check_compl 

BEFORE UPDATE ON labresults
FOR EACH ROW
BEGIN
IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN 
    SET NEW.completed_at = CURRENT_TIMESTAMP;
END IF;
END;
//

DELIMITER;

--verfied trigger

DELIMITER //

CREATE TRIGGER check_ver
BEFORE UPDATE ON labresults
FOR EACH ROW
BEGIN
IF NEW.status = 'Verified' AND OLD.status =! 'Verified' THEN
    SET NEW.verified_at = CURRENT_TIMESTAMP;
END IF;
END;
//

DELIMITER;


CREATE TABLE payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    referral_id INT,
    amount DECIMAL(20,2) NOT NULL,
    method ENUM('cash','mpesa','insurance','bank','card'),
    insurance_type ENUM('SHA','MINET','AON','Private','None'),
    is_covered BOOLEAN DEFAULT FALSE,
    tx_code VARCHAR(100), --Transaction code
    status ENUM('pending','paid','rejected','refunded'),
    paid_at TIMESTAMP DEFAULT NULL,
    refunded_at TIMESTAMP DEFAULT NULL,
    rejected_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (referral_id) REFERENCES referrals(id)
);


--triggers

--update paytime
DEIMITER//
CREATE TRIGGER paytime 
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    SET NEW.paid_at = CURRENT_TIMESTAMP;
END IF;
END;
//
DELIMITER;


--update refundtime

DELIMITER //
CREATE TRIGGER reftime 
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'refunded' AND OLD.status = 'paid' THEN
    SET NEW.refunded_at = CURRENT_TIMESTAMP;
END IF;
END;
//
DELIMITER;

DELIMITER //

--refunded at what time

CREATE TRIGGER rject
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'rejected' AND OLD.status != 'rejected'
    SET NEW.rejected_at = CURRENT_TIMESTAMP;
END IF;
END;
//
DELIMITER;


--prevent refunding msee hajalipa shiet

DELIMITER //
CREATE TRIGGER valpay
BEFORE UPDATE ON payments
FOR EACH ROW
BEGIN
IF NEW.status = 'refunded' AND OLD.status != 'paid' THEN
    SIGNAL SQLSTATE  '45000'
    SET MESSAGE_TEXT = 'Cannot refund a payment that wasnt paid';
END IF;
END;
//
DELIMITER;


--logs now 

CREATE TABLE audit_log(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, --who did it
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(100) NOT NULL,
    target_id INT, --enforce in backend and  is equal to target table(id)
    description TEXT,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    
);

--user id will be passed from express 

--audit logs triggers now...wueeh


--facility update

DELIMITER //

CREATE TRIGGER audit_facility_update
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
END;
//

DELIMITER ;



--users update


DELIMITER //

CREATE TRIGGER audit_user_update
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
END;
//

DELIMITER ;

--log when user is created

DELIMITER //

CREATE TRIGGER audit_user_insert
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
END;
//

DELIMITER ;


-- log when you update patient records

DELIMITER //

CREATE TRIGGER audit_patient_update
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
END;
//

DELIMITER ;

--create patient

DELIMITER //

CREATE TRIGGER audit_patient_insert
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
END;
//

DELIMITER ;


--update doctors logs


DELIMITER //

CREATE TRIGGER audit_doctor_update
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
END;
//

DELIMITER ;

--create doctor logs

DELIMITER //

CREATE TRIGGER audit_doctor_insert
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
END;
//

DELIMITER ;


--update surgeon logs 
DELIMITER //

CREATE TRIGGER audit_surgeon_update
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
END;
//

DELIMITER ;


--create surgeon logs

DELIMITER //

CREATE TRIGGER audit_surgeon_insert
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
END;
//

DELIMITER ;


--update nurses logs

DELIMITER //

CREATE TRIGGER audit_nurse_update
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
END;
//

DELIMITER ;


--create nurse logsss ..shiet  hii jua ya nchiru joh

DELIMITER //

CREATE TRIGGER audit_nurse_insert
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
END;
//

DELIMITER ;


--labtechs update logs

DELIMITER //

CREATE TRIGGER audit_labtech_update
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
END;
//

DELIMITER ;


--create labtech

DELIMITER //

CREATE TRIGGER audit_labtech_insert
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
END;
//

DELIMITER ;




GDELIMITER //

CREATE TRIGGER audit_referral_update
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
END;
//

DELIMITER ;

--create referrals logs

DELIMITER //

CREATE TRIGGER audit_referral_insert
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
END;
//

DELIMITER ;

-- update referall notes log

DELIMITER //

CREATE TRIGGER audit_referral_note_update
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
END;
//

DELIMITER ;


--create ref notes log 


DELIMITER //

CREATE TRIGGER audit_referral_note_insert
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
END;
//

DELIMITER ;


--update blockchain logs

DELIMITER //

CREATE TRIGGER audit_blockchain_log_update
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
END;
//

DELIMITER ;


--create blochainlogs

DELIMITER //

CREATE TRIGGER audit_blockchain_log_insert
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
END;
//

DELIMITER ;


-- update patient visits log

DELIMITER //

CREATE TRIGGER audit_visit_update
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
END;
//

DELIMITER ;

--create visits logs


DELIMITER //

CREATE TRIGGER audit_visit_insert
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
END;
//

DELIMITER ;


--update lab results log

DELIMITER //

CREATE TRIGGER audit_labresult_update
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
END;
//

DELIMITER ;

--create lab results

DELIMITER //

CREATE TRIGGER audit_labresult_insert
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
END;
//

DELIMITER ;





--audit on update payment

DELIMITER //

CREATE TRIGGER audit_payment_update
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
END;
//

DELIMITER ;


--audit on create payment


DELIMITER //

CREATE TRIGGER audit_payment_insert
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
END;
//

DELIMITER ;



--dept insert


DELIMITER //

CREATE TRIGGER audit_department_insert
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
END;
//

DELIMITER ;


--dept update


DELIMITER //

CREATE TRIGGER audit_department_update
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
END;
//

DELIMITER ;


--staff update

DELIMITER //

CREATE TRIGGER audit_<table>_update
AFTER UPDATE ON <table>
FOR EACH ROW
BEGIN
  DECLARE change_summary TEXT DEFAULT '';


 IF NEW.fname!= OLD.fname THEN
    SET change_summary = CONCAT(change_summary, 'Field changed from "', OLD.fname, '" to "', NEW.fname '". ');
 END IF;
  IF NEW.lname!= OLD.lname THEN
     SET change_summary = CONCAT(change_summary, 'Field changed from "', OLD.lname, '" to "', NEW.lname '". ');
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
      '<table>',
      NEW.id,
      change_summary,
      CURRENT_TIMESTAMP
    );
  END IF;
END;
//

DELIMITER ;


--staff insert

DELIMITER //

CREATE TRIGGER audit_<table>_insert
AFTER INSERT ON <table>
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
    '<table>',
    NEW.id,
    CONCAT('New <table> record created for user_id ', NEW.user_id),
    CURRENT_TIMESTAMP
  );
END;
//

DELIMITER ;











































