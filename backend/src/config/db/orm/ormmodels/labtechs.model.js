import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import User from './user.model..js';


export default(sequelize)=>{
const Labtech = sequelize.define('Labtech', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    /*references: {
      model: User,
      key: 'id'
    }*/
  },
  license_no: {
    type: DataTypes.STRING(50),
    unique: true
  },
  qualification: {
    type: DataTypes.ENUM('Diploma', 'BSc Medical lab')
  },
  speciality: {
    type: DataTypes.STRING(100)
  },
  years_experience: {
    type: DataTypes.INTEGER
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
  tableName: 'labtechs'
});

Labtech.associates = (models) =>{
  Labtech.belongsTo(models.User,{foreignKey: 'user_id', as: 'labtech'});
  Labtech.hasMany(models.LabResult,{foreignKey:'labtech_id', as:'res_labtech'});


}




return Labtech;




}



/*
// Associations
Labtech.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Labtech, { foreignKey: 'user_id' });

export default Labtech;*/
