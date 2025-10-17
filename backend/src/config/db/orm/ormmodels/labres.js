import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import Patient from './patients.js';
import Labtech from './labtechs.js';
import Referral from './referrals.js'; // optional, if you plan to use referral_id

const LabResult = sequelize.define('LabResult', {
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
  labtech_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Labtech,
      key: 'id'
    }
  },
  referral_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Referral,
      key: 'id'
    }
  },
  test_type: {
    type: DataTypes.STRING(100)
  },
  results_summary: {
    type: DataTypes.TEXT
  },
  result_file_url: {
    type: DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Verified')
  },
  verified_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  completed_at: {
    type: DataTypes.DATE,
    defaultValue: null
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
  tableName: 'labresults'
});

// Associations
LabResult.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(LabResult, { foreignKey: 'patient_id' });

LabResult.belongsTo(Labtech, { foreignKey: 'labtech_id' });
Labtech.hasMany(LabResult, { foreignKey: 'labtech_id' });

LabResult.belongsTo(Referral, { foreignKey: 'referral_id' });
Referral.hasMany(LabResult, { foreignKey: 'referral_id' });

export default LabResult;
