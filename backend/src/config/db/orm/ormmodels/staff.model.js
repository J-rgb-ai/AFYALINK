import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Department from './departments.js';
//import User from './user.model.js';

export default(sequelize)=> {
const Staff = sequelize.define('Staff', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
   /* references: {
      model: Department,
      key: 'id'
    }*/
  },
  user_id: {
    type: DataTypes.INTEGER,
    /*references: {
      model: User,
      key: 'id'
    }*/
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
  tableName: 'staff'
});

Staff.associate = (models) =>{
  Staff.belongsTo(models.User,{foreignKey: 'user_is', as: 'staff_user'});
  Staff.belongsTo(models.Department,{foreignKey: 'department_id',as: 'department'});

}


return Staff;

}


/*
Staff.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Staff, { foreignKey: 'department_id' });

Staff.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Staff, { foreignKey: 'user_id' });

export default Staff;
*/
