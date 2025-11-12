import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import User from './user.js';

const AuditLog = sequelize.define('AuditLog', {
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
  action: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  target_table: {
    type: DataTypes.STRING(100)
  },
  target_id: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.TEXT
  },
  time_stamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'audit_log'
});

// Associations
AuditLog.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(AuditLog, { foreignKey: 'user_id' });

export default AuditLog;
