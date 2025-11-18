import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Referral from './referrals.js';


export default(sequelize)=> {

const BlockchainLog = sequelize.define('BlockchainLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referral_id: {
    type: DataTypes.INTEGER,
    /*references: {
      model: Referral,
      key: 'id'
    }*/
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


BlockchainLog.associate = (models) =>{
  BlockchainLog.belongsTo(models.Referral,{foreignKey: 'referral_id', as: 'chain_reff'});

}


return BlockchainLog;

}
// 
// As
// s
// ociations
/*
BlockchainLog.belongsTo(Referral, { foreignKey: 'referral_id' });
Referral.hasMany(BlockchainLog, { foreignKey: 'referral_id' });

export default BlockchainLog;
*/