const {Sequelize} =require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host:process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        port: process.env.DB_PORT || 5433, 
        logging:false
    }
);

const connectDB=async()=>{
    try {
        await sequelize.authenticate();
        console.log('DATABASE CONNECTED SUCCESSFULLY');
        
    } catch (err) {
        console.error('DATABASE CONNECTION FAILED:',err);
        process.exit(1);
    }
}

module.exports={sequelize,connectDB};