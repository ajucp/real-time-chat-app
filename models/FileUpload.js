const {DataTypes}=require('sequelize');
const {sequelize}=require('../config/db');

const FileUpload=sequelize.define('Fileupload',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false
    },
    filename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    filetype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    filepath:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{timestamps:true});

module.exports=FileUpload;