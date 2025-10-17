import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import User from './user.js';

const Nurse = sequelize.define('Nurse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  license_number: {
    type: DataTypes.STRING(50),
    unique: true
  },
  cadre: {
    type: DataTypes.ENUM('Enrolled Nurse', 'Registered Nurse'),
    defaultValue: 'Enrolled Nurse'
  },
  qualification: {
    type: DataTypes.ENUM('Diploma', 'BSc Nursing')
  },
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_specialist: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  speciality: {
    type: DataTypes.STRING(100)
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
  tableName: 'nurses'
});

// Associations
Nurse.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Nurse, { foreignKey: 'user_id' });

export default Nurse;
