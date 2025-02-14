const {sequelize}=require('../config/db');
const User=require('./user');
const Message=require('./Message');
const FileUpload=require('./FileUpload');
const ActivityLog=require('./ActivityLog');

User.hasMany(Message,{foreignKey:'senderId'});
User.hasMany(Message,{foreignKey:'receiverId'});

User.hasMany(FileUpload,{foreignKey:'userId'});

User.hasMany(ActivityLog,{foreignKey:'userId'});
ActivityLog.belongsTo(User,{foreignKey:"userId"});

Message.belongsTo(User,{foreignKey:'senderId',as:'Sender'});
Message.belongsTo(User,{foreignKey:'receiverId',as:'Receiver'});

FileUpload.belongsTo(User,{foreignKey:'userId'});

const syncDB=async()=>{
    await sequelize.sync({alter:true});
    console.log('DATABASE IS SYNCED');
};
module.exports={sequelize,syncDB,User,Message,FileUpload,ActivityLog};


