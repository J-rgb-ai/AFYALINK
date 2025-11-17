import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import { sequelize } from '../sequalize.js';


export default(sequelize) =>{

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
   /* references: {
      model: User,
      key: 'id'
    }*/
  },
  license_number: {
    type: DataTypes.STRING(50),
    unique: true
  },
  is_specialist: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  speciality: {
    type: DataTypes.STRING(100)
  },
  qualification: {
    type: DataTypes.STRING(100)
  },
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'doctors'
});

Doctor.associate = (models) =>{
  Doctor.belongsTo(models.User,{foreignKey:'user_id',as: 'doctor'});
  Doctor.hasOne(models.Surgeon,{foreignKey: 'doctor_id', as: 'sur_doctor'});

};

return Doctor;







}




//xport default Doctor;
