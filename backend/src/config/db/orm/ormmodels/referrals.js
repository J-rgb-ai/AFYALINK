import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import Patient from './patients.js';
import User from './user.js';
import Facility from './facility.js';

const Referral = sequelize.define('Referral', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    }
  },
  reffering_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  reffering_facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Facility,
      key: 'id'
    }
  },
  receiving_facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Facility,
      key: 'id'
    }
  },
  reason: {
    type: DataTypes.TEXT
  },
  priority: {
    type: DataTypes.ENUM('Routine', 'Urgent', 'Emergency'),
    defaultValue: 'Routine'
  },
  referral_hash: {
    type: DataTypes.STRING(255)
  },
  blockchain_tx_id: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('sent', 'received', 'accepted', 'completed', 'rejected')
  },
  notes: {
    type: DataTypes.TEXT
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
  tableName: 'referrals'
});

//asociates

Referral.belongsTo(Patient, { foreignKey: 'patient_id' });
Referral.belongsTo(User, { foreignKey: 'reffering_user_id', as: 'referrer' });
Referral.belongsTo(Facility, { foreignKey: 'reffering_facility_id', as: 'fromFacility' });
Referral.belongsTo(Facility, { foreignKey: 'receiving_facility_id', as: 'toFacility' });

Patient.hasMany(Referral, { foreignKey: 'patient_id' });
User.hasMany(Referral, { foreignKey: 'reffering_user_id', as: 'referralsMade' });
Facility.hasMany(Referral, { foreignKey: 'reffering_facility_id', as: 'outgoingReferrals' });
Facility.hasMany(Referral, { foreignKey: 'receiving_facility_id', as: 'incomingReferrals' });


export default Referral;
