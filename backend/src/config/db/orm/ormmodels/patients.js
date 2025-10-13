import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import User from './user.js';

const Patient = sequelize.define('Patient', {
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
  national_id: {
    type: DataTypes.STRING(50)
  },
  blood_type: {
    type: DataTypes.STRING(50)
  },
  allergies: {
    type: DataTypes.TEXT
  },
  chronic_conditions: {
    type: DataTypes.TEXT
  },
  emergency_cont_name: {
    type: DataTypes.STRING(100)
  },
  emergency_cont_phone: {
    type: DataTypes.STRING(20)
  },
  is_insured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  insurance_type: {
    type: DataTypes.ENUM('sha', 'minet', 'private', 'none')
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
  tableName: 'patients'
});

Patient.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Patient, { foreignKey: 'user_id' });

export default Patient;
