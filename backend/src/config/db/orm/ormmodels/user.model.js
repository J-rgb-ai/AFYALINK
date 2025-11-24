import { DataTypes, DATE } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Facility from './facility.js'; // circular import loading... i hate my life

export default(sequelize) =>{
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_role: {
    type: DataTypes.ENUM('doctor', 'nurse', 'patient', 'admin','iadmin','refmanager','refmanagertobe','assign'),
    defaultValue: 'assign'
  },
  gender: {
    type: DataTypes.ENUM(
      'Male',
      'Female',
      'Bi-sexual',
      'Lesbian',
      'Homosexual',
      'They/Them and other shenanigans'
    )
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  photo: {
    type: DataTypes.BLOB('long')
  },
  mime:{
    type: DataTypes.STRING(50)
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  facility_id: {
    type: DataTypes.INTEGER,
    //references: {
      //model: Facility,
      //key: 'id'
   // }
  },
  disabled:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  no_dis:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dis_res:{
    type: DataTypes.STRING(500),
    defaultValue: 'Did something bad and account was dissabled'
  },
  wrong:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dis_un:{
    type: DataTypes,DATE,
    
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
  tableName: 'users'
});

User.associate = (models) =>{
  User.belongsTo(models.Facility,{foreignKey:'facility_id', as: 'user_fac'});
  User.hasOne(models.Doctor,{foreignKey:'user_id',as:'doctor'});
  User.hasOne(models.Surgeon,{foreignKey: 'user_id', as: 'surgeon'});
  User.hasOne(models.Nurse,{foreignKey:'user_id', as: 'nurse'});
  User.hasOne(models.Labtech,{foreignKey: 'user_id', as: 'labtech'});
  User.hasOne(models.Patient,{foreignKey:'user_id',as: 'user_patient'});
  User.hasMany(models.Referral,{foreignKey: 'reffering_user_id', as: 'referer'});
  User.hasMany(models.Visit,{foreignKey: 'server_id', as: 'medic'});
  User.hasMany(models.ReferralNote,{foreignKey: 'author_id', as: 'author'});
  User.hasOne(models.Staff,{foreignKey: 'user_id', as: 'user_staff'});
  User.hasMany(models.AuditLog,{foreignKey:'user_id', as:'audit_user'});



};
return User;

}

//User.belongsTo(Facility, { foreignKey: 'facility_id', as: 'fac'});

//export default User;
