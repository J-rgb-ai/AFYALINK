import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import Facility from './facility.js'; // assuming you've defined Facility model

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
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  facility_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Facility,
      key: 'id'
    }
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

User.belongsTo(Facility, { foreignKey: 'facility_id', as: 'fac'});
Facility.hasMany(User, { foreignKey: 'facility_id', as: 'fac'});

export default User;
