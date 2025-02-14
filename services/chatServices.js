const {Message,User}=require('../models');
const {Op}=require('sequelize');

const getChatHistory=async(user1Id,user2Id,page=1,pageSize=10)=>{
    const offset=(page-1)*pageSize;

    const messages=await Message.findAll({
        where:{
            [Op.or]:[
                {senderId:user1Id,receiverId:user2Id},
                {senderId:user2Id,receiverId:user1Id}
            ]
        },
        include:[
            {model:User,as:'Sender',attributes:['id','username']},
            {model:User,as:'Receiver',attributes:['id','username']}
        ],
        order:[['createdAt','DESC']],
        limit:pageSize,
        offset

    });
    return messages;
}

module.exports={getChatHistory}