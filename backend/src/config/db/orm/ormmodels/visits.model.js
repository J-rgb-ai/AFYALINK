import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Patient from './patients.model.js';
//import Facility from './facility.model.js';
//import Referral from './referrals.model.js';
//import User from './user.model..js';


export default(sequelize) =>{

const Visit = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Patient,
      key: 'id'
    }*/
  },
  facility_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Facility,
      key: 'id'
    }*/
  },
  visit_date: {
    type: DataTypes.DATE
  },
  reason: {
    type: DataTypes.TEXT
  },
  server_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: User,
      key: 'id'
    }*/
  },
  was_referred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  referred_patient: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  visited_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  referral_id:{
    type: DataTypes.INTEGER,
   /* references:{
      model: Referral,
      key: 'id'
    }*/

  },
  infacility:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  revisited_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: 'visited_at',
  updatedAt: 'revisited_at',
  tableName: 'visits'
});

Visit.associate = (models) =>{
Visit.belongsTo(models.Referral,{foreignKey: 'referral_id', as: 'factoviz'});
Visit.belongsTo(models.Patient,{foreignKey: 'patient_id', as: 'viz_patient'});
Visit.belongsTo(models.Facility,{foreignKey: 'facility_id', as: 'viz_facility'});
Visit.belongsTo(models.User,{foreignKey: 'server_id', as: 'medic'});

Visit.hasOne(models.Referral,{foreignKey: 'visit_id', as: 'facfroviz'});


};



return Visit;

}


/*
// Associations
Visit.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(Visit, { foreignKey: 'patient_id' });
Visit.belongsTo(Referral,{foreignKey: 'referral_id'});
Referral.hasOne(Visit,{foreignKey: 'referral_id'});

Visit.belongsTo(Facility, { foreignKey: 'facility_id' });
Facility.hasMany(Visit, { foreignKey: 'facility_id' });

Visit.belongsTo(User, { foreignKey: 'server_id', as: 'server' });
User.hasMany(Visit, { foreignKey: 'server_id' });

export default Visit;

*/