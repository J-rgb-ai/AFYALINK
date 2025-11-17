import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';

export default(sequelize)=>{
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

Department.associate = (models)=>{
  Department.hasMany(models.Staff,{foreignKey: 'department_id', as: 'department'});

}


return Department;
}


/*
export default Department;
*/
