import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  department_name: {
    type: DataTypes.ENUM('support staff', 'IT', 'Nursing', 'Clinical', 'Special')
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
  tableName: 'departments'
});

export default Department;
