const {ActivityLog}=require('../models');

const logActivity=async(userId,action,details=null)=>{
    await ActivityLog.create({userId,action,details})
}

module.exports={logActivity};