import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Patient from './patients.js';
import Referral from './referrals.js';

const Payment = sequelize.define('Payment', {
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
  referral_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Referral,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false
  },
  method: {
    type: DataTypes.ENUM('cash', 'mpesa', 'insurance', 'bank', 'card')
  },
  insurance_type: {
    type: DataTypes.ENUM('SHA', 'MINET', 'AON', 'Private', 'None')
  },
  is_covered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tx_code: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'rejected', 'refunded')
  },
  paid_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  refunded_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  rejected_at: {
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
  tableName: 'payments'
});

// Associations
Payment.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(Payment, { foreignKey: 'patient_id' });

Payment.belongsTo(Referral, { foreignKey: 'referral_id' });
Referral.hasMany(Payment, { foreignKey: 'referral_id' });

export default Payment;
