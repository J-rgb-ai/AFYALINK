import { DataTypes } from "sequelize";
import sequelize from "../sequalize.js";


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

export default Facility;