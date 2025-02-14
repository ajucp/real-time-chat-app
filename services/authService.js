const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {User}=require('../models');
const ActivityLogService=require('./activityLogService');
require('dotenv').config();

const register=async(username,email,password)=>{

    const existingUser=await User.findOne({where:{email} });
    if(existingUser) throw new Error("USER ALREADY EXISTS");
    
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({username,email,password:hashedPassword});

    return {
        id:user.id,
        username:user.username,
        email:user.email
    }
}

const login=async(email,password)=>{

    const user=await User.findOne({where:{email}});
    if(!user) throw new Error("INVALID CREDENTIALS");

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("INVALID CREDENTIALS");
    
    const token=jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:'1d'}
    );
    await ActivityLogService.logActivity(user.id,'USER LOGGED IN');

    return {
        token,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    };
    
}

module.exports={register,login}