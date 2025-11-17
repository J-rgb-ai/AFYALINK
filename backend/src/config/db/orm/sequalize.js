import {Sequelize } from 'sequelize';
import  dotenv from 'dotenv';
import userModel from './ormmodels/user.model.js';
import facilityModel from './ormmodels/facility.model.js';
import doctorsModel from './ormmodels/doctors.model.js';
import auditlogModel from './ormmodels/auditlog.model.js';
import nurseModel from './ormmodels/nurse.model.js';
import labresModel from './ormmodels/labres.model.js';
import labtechsModel from './ormmodels/labtechs.model.js';
import paymentsModel from './ormmodels/payments.model.js';
import patientsModel from './ormmodels/patients.model.js';
import referralsModel from './ormmodels/referrals.model.js';
import refnotesModel from './ormmodels/refnotes.model.js';
import staffModel from './ormmodels/staff.model.js';
import chainlogsModel from './ormmodels/chainlogs.model.js';
import blockipModel from './ormmodels/blockip.model.js';
import visitsModel from './ormmodels/visits.model.js';
import surgeonModel from './ormmodels/surgeon.model.js';
import departmentsModel from './ormmodels/departments.model.js';

dotenv.config();

//narudi kiasi tu



const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.ADMIN,
    process.env.ADMINPASS,
    {
        host: process.env.DB_host,
        port: process.env.DB_PORT,
        dialect: 'mariadb', //hii ni driver or smth
        logging: false
    }
);

const models = {
    User: userModel(sequelize),
    Facility: facilityModel(sequelize),
    Doctor: doctorsModel(sequelize),
    Department: departmentsModel(sequelize),
    Surgeon: surgeonModel(sequelize),
    Nurse: nurseModel(sequelize),
    Patient: patientsModel(sequelize),
    Payment: paymentsModel(sequelize),
    Referral: referralsModel(sequelize),
    Staff: staffModel(sequelize),
    Labtech: labtechsModel(sequelize),
    ReferralNote: referralsModel(sequelize),
    AuditLog: auditlogModel(sequelize),
    Visit: visitsModel(sequelize),
    BlockchainLog: chainlogsModel(sequelize),
    ReferralNote: refnotesModel(sequelize),
    Blocked: blockipModel(sequelize),
    LabResult: labresModel(sequelize)

};

Object.values(models).forEach(model=>{
    if(model.associate) model.associate(models);
})

export  {sequelize};
export default models;