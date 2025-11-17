import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Patient from './patients.model.js';
//import User from './user.model..js';
//import Facility from './facility.model.js'


export default(sequelize)=>{

const Referral = sequelize.define('Referral', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   /* references: {
      model: Patient,
      key: 'id'
    }*/
  },
  reffering_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   /* references: {
      model: User,
      key: 'id'
    }*/
  },
  reffering_facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   /* references: {
      model: Facility,
      key: 'id'
    }*/
  },
  receiving_facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    /*references: {
      model: Facility,
      key: 'id'
    }*/
  },
  reason: {
    type: DataTypes.TEXT
  },
  priority: {
    type: DataTypes.ENUM('Routine', 'Urgent', 'Emergency'),
    defaultValue: 'Routine'
  },
  referral_hash: {
    type: DataTypes.STRING(255)
  },
  blockchain_tx_id: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('processing', 'accepted', 'completed', 'rejected','approved','tobeapproved','suspended'),
    defaultValue: 'tobeapproved'
  },
  notes: {
    type: DataTypes.TEXT
  },
  req_date:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  need_date:{
    type: DataTypes.DATE

  },
  sched_date:{
    type: DataTypes.DATE
  },
  visit_id:{
    type: DataTypes.INTEGER,
    unique: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'referrals'
});

Referral.associate = (models) =>{
  Referral.belongsTo(models.Patient,{foreignKey: 'patient_id', as: 'ref_patient'});
  Referral.belongsTo(models.User,{foreignKey: 'reffering_user_id', as: 'referer'});
  Referral.belongsTo(models.Facility,{foreignKey:'reffering_facility_id', as: 'facfro'});
  Referral.belongsTo(models.Facility,{foreignKey:'receiving_facility_id', as: 'facto'});
  Referral.belongsTo(models.Visit,{foreignKey: 'visit_id', as: 'facfroviz'});

  Referral.hasOne(models.Visit,{foreignKey: 'referral_id', as: 'factoviz'});
  Referral.hasOne(models.ReferralNote,{foreignKey: 'referral_id', as: 'summary'});
  Referral.hasMany(models.BlockchainLog,{foreignKey: 'referral_id', as: 'chain_reff'});
  Referral.hasMany(models.Payment,{foreignKey: 'referral_id', as: 'pay_reff'});


}



return Referral;

}




/*
Referral.belongsTo(Patient, { foreignKey: 'patient_id' , as: 'patient'});
Referral.belongsTo(User, { foreignKey: 'reffering_user_id', as: 'referrer' });
Referral.belongsTo(Facility, { foreignKey: 'reffering_facility_id', as: 'facilityfrom' });
Referral.belongsTo(Facility, { foreignKey: 'receiving_facility_id', as: 'facilityto' });
//Referral.belongsTo(Visit,{foreignKey: 'visit_id', as: 'refvisit'});


Patient.hasMany(Referral, { foreignKey: 'patient_id', as:'patient' });
User.hasMany(Referral, { foreignKey: 'reffering_user_id', as: 'referralsMade' });
Facility.hasMany(Referral, { foreignKey: 'reffering_facility_id', as: 'facilityfrom' });
Facility.hasMany(Referral, { foreignKey: 'receiving_facility_id', as: 'facilityto' });
//Referral.hasOne(Visit,{foreignKey: 'visit_id', as: 'refvisit'});


export default Referral;
*/
