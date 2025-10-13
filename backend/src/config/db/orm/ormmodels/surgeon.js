import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import User from './user.js';
import Doctor from './doctor.js';
import Facility from './facility.js';

const Surgeon = sequelize.define('Surgeon', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Doctor,
      key: 'id'
    }
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
    references: {
      model: Facility,
      key: 'id'
    }
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

// Associations
Surgeon.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Surgeon, { foreignKey: 'user_id' });

Surgeon.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Doctor.hasOne(Surgeon, { foreignKey: 'doctor_id' });

Surgeon.belongsTo(Facility, { foreignKey: 'operating_facility_id' });
Facility.hasMany(Surgeon, { foreignKey: 'operating_facility_id' });

export default Surgeon;
