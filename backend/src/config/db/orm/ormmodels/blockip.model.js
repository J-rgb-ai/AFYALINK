import { DataTypes } from "sequelize";
import {sequelize} from "../sequalize.js";
import models from "../sequalize.js";



export default(sequelize) =>{
const Blocked = sequelize.define('Blocked',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    req_body:{
        type: DataTypes.JSON,
        allowNull: true
    },
    req_head:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    auto_block:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
   hits: {
    type: DataTypes.INTEGER,
    allowNull: false

    },
    blocked_by:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reason:{
        type: DataTypes.STRING(900),
        allowNull: true
    },
    ip:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    time:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    decoded_tok:{
        type: DataTypes.JSON,
        allowNull: true

    },
    req_meth:{
        type: DataTypes.STRING(50),
        allowNull: true
    
    },
    blocked:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    sent:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }


},
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'blockips'
}
);



return Blocked;


}




//export default Blocked;