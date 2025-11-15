import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import User from './user.model..js';


export default(sequelize) =>{


const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: User,
      key: 'id'
    }*/
  },
  national_id: {
    type: DataTypes.STRING(50)
  },
  blood_type: {
    type: DataTypes.STRING(50)
  },
  allergies: {
    type: DataTypes.TEXT
  },
  chronic_conditions: {
    type: DataTypes.TEXT
  },
  emergency_cont_name: {
    type: DataTypes.STRING(100)
  },
  emergency_cont_phone: {
    type: DataTypes.STRING(20)
  },
  is_insured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  insurance_type: {
    type: DataTypes.ENUM('sha', 'minet', 'private', 'none')
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
  tableName: 'patients'
});


Patient.associate = (models)=>{
  Patient.belongsTo(models.User,{foreignKey: 'user_id', as: 'user_patient'});
  Patient.hasMany(models.LabResult,{foreignKey: 'patient_id', as: 'lab_patient_'});
  Patient.hasMany(models.Referral,{foreignKey: 'patient_id', as: 'ref_patient'});
  Patient.hasMany(models.Visit,{foreignKey:'patient_id', as: 'viz_patient'});
  Patient.hasMany(models.Payment,{foreignKey: 'patient_id', as:'pay_patient'});


}


return Patient;

}


/*
Patient.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Patient, { foreignKey: 'user_id' });

export default Patient;
*/
