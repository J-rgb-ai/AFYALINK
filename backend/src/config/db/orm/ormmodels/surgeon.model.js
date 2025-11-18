import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import User from './user.model..js';
//import Doctor from './doctors.model.js';
//import Facility from './facility.model.js';


export default(sequelize) =>{

const Surgeon = sequelize.define('Surgeon', {
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
  doctor_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Doctor,
      key: 'id'
    }*/
  },
  license_number: {
    type: DataTypes.STRING(50),
    unique: true
  },
  qualification: {
    type: DataTypes.STRING(100)
  },
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  operating_facility_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Facility,
      key: 'id'
    }*/
  },
  is_consultant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: 'surgeons'
});

Surgeon.associate = (models) =>{
  Surgeon.belongsTo(models.User,{foreignKey: 'user_id', as: 'surgeon'});
  Surgeon.belongsTo(models.Doctor,{foreignKey: 'doctor_id', as: 'sur_doctor'});
  Surgeon.belongsTo(models.Facility,{foreignKey: 'operating_facility_id', as: 'sur_facility'});
};

return Surgeon;


}
// Associations
/*Surgeon.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Surgeon, { foreignKey: 'user_id' });

Surgeon.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Doctor.hasOne(Surgeon, { foreignKey: 'doctor_id' });

Surgeon.belongsTo(Facility, { foreignKey: 'operating_facility_id' });
Facility.hasMany(Surgeon, { foreignKey: 'operating_facility_id' });

export default Surgeon;
*/