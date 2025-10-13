import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Patient from './patients.js';
import Facility from './facility.js';
import User from './user.js';

const Visit = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id'
    }
  },
  facility_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Facility,
      key: 'id'
    }
  },
  visit_date: {
    type: DataTypes.DATEONLY
  },
  reason: {
    type: DataTypes.TEXT
  },
  server_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
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

// Associations
Visit.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(Visit, { foreignKey: 'patient_id' });

Visit.belongsTo(Facility, { foreignKey: 'facility_id' });
Facility.hasMany(Visit, { foreignKey: 'facility_id' });

Visit.belongsTo(User, { foreignKey: 'server_id', as: 'server' });
User.hasMany(Visit, { foreignKey: 'server_id' });

export default Visit;
