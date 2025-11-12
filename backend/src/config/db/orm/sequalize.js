import {Sequelize } from 'sequelize';
import  dotenv from 'dotenv';

dotenv.config();




const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.ADMIN,
    process.env.ADMINPASS,
    {
        host: process.env.DB_host,
        port: process.env.DB_PORT,
        dialect: 'mariadb', //hii ni driver or smth
        logging: false
    }
);

export default sequelize;