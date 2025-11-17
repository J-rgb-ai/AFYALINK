import { DataTypes } from "sequelize";
//import sequelize from "../sequalize";
import {sequelize} from "../sequalize.js";
//import User from "./user.js";
import models from "../sequalize.js";

export default(sequelize)=>{
 const Facility = sequelize.define('Facility', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    fac_name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fac_type:{
        type: DataTypes.ENUM('clinic','hospital','lab','specialist'),
        defaultValue: 'hospital'
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    photo:{
        type: DataTypes.BLOB('long')
    },
    fac_phone: {
        type:DataTypes.STRING(20)

    },
    fac_email:{
        type:DataTypes.STRING(100)
    },
    sha_code:{
        type:DataTypes.STRING(50)
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    mime:{
        type: DataTypes.STRING(50)
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
{
    timestamps:true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName:"facilities"
}


);

Facility.associate = (models)=>{
    Facility.hasOne(models.User,{foreignKey:'facility_id', as: 'user_fac'});
    Facility.hasOne(models.Surgeon,{foreignKey: 'operating_facility_id', as: 'sur_facility'});
    Facility.hasMany(models.Referral,{foreignKey: 'reffering_facility_id', as: 'facfro'});
    Facility.hasMany(models.Referral,{foreignKey: 'receiving_facility_id', as: 'facto'});
    Facility.hasMany(models.Visit,{foreignKey: 'facility_id', as: 'viz_facility'});

};
return Facility;

}

//Facility.hasMany(User, { foreignKey: 'facility_id', as: 'fac'});


//export default Facility;