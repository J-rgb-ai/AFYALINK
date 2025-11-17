import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Patient from './patients.js';
//import Referral from './referrals.js';


export default(sequelize)=>{
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Patient,
      key: 'id'
    }*/
  },
  referral_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Referral,
      key: 'id'
    }*/
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


Payment.associate = (models) =>{
  Payment.belongsTo(models.Patient,{foreignKey: 'patient_id', as: 'pay_patient'});
  Payment.belongsTo(models.Referral,{foreignKey: 'referral_id', as: 'pay_reff'});

}




return Payment;
}



/*
// Associations
this code is trash "withered rose emoji"
Payment.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(Payment, { foreignKey: 'patient_id' });

Payment.belongsTo(Referral, { foreignKey: 'referral_id' });
Referral.hasMany(Payment, { foreignKey: 'referral_id' });

export default Payment;
*/
