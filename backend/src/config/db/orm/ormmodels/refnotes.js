import { DataTypes } from 'sequelize';
import sequelize from '../sequalize.js';
import Referral from './referrals.js';
import User from './user.js';

const ReferralNote = sequelize.define('ReferralNote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referral_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Referral,
      key: 'id'
    }
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  note: {
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
  tableName: 'referral_notes'
});

// Associations
ReferralNote.belongsTo(Referral, { foreignKey: 'referral_id', as: 'not'});
Referral.hasMany(ReferralNote, { foreignKey: 'referral_id',  as: 'not'});

ReferralNote.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(ReferralNote, { foreignKey: 'author_id' });

export default ReferralNote;
