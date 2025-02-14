const ChatService=require('../services/chatServices');

exports.getChatHistory=async(req,res)=>{
    console.log('GET CHAT HISTORY CONTROLLER');
    try {
        const {user1Id,user2Id,page,pageSize}=req.query;

        if(!user1Id||!user2Id){
            return res.status(400).json({error:'USER IDs ARE REQUIRED'})
        }

        const chatHistory=await ChatService.getChatHistory(user1Id,user2Id,Number(page),Number(pageSize));
        res.status(200).json({chatHistory});
    } catch (err) {
        res.status(500).json({err:'FAILED TO RETRIVE CHAT HISTORY'})
    }
}