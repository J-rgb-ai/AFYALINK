import { DataTypes } from 'sequelize';
import models from '../sequalize.js';
import {sequelize} from '../sequalize.js';
//import Referral from './referrals.model.js';
//import User from './user.model..js';

export default(sequelize)=>{
const ReferralNote = sequelize.define('ReferralNote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referral_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   /* references: {
      model: Referral,
      key: 'id'
    }*/
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   /* references: {
      model: User,
      key: 'id'
    }*/
  },
  note: {
    type: DataTypes.TEXT //change later to string idk
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


ReferralNote.associate = (models) =>{
  ReferralNote.belongsTo(models.Referral,{foreignKey: 'referral_id',as: 'summary'});
  ReferralNote.belongsTo(models.User,{foreignKey:'author_id', as: 'author'});

}



return ReferralNote;
}


/*
// Associations
ReferralNote.belongsTo(Referral, { foreignKey: 'referral_id', as: 'not'});
Referral.hasMany(ReferralNote, { foreignKey: 'referral_id',  as: 'not'});

ReferralNote.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(ReferralNote, { foreignKey: 'author_id' });

export default ReferralNote;*/
