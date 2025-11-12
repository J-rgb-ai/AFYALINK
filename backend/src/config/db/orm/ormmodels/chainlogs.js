import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import Referral from './referrals.js';

const BlockchainLog = sequelize.define('BlockchainLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referral_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Referral,
      key: 'id'
    }
  },
  tx_id: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
    defaultValue: 'pending'
  },
  err_mess: {
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
  tableName: 'blockchain_log'
});

// Associations
BlockchainLog.belongsTo(Referral, { foreignKey: 'referral_id' });
Referral.hasMany(BlockchainLog, { foreignKey: 'referral_id' });

export default BlockchainLog;
