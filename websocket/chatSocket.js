const {Message,User}=require('../models');
const ActivityLogService=require('../services/activityLogService');

module.exports=(io)=>{
    io.on('connection',(socket)=>{
        console.log('A USER CONNECTED: ',socket.id);

        //mapping user Id to socket
        // socket.on('join',({userId})=>{
            
        //     socket.join(userId);                //join the user to room with userId
        //     console.log(`User ${userId} joined with socket ID:${socket.id}`);

        //     //sending cinformation message to user
        //     socket.emit('joined',{message:`User ${userId} joined the chat`});


        // })
        

        socket.on('sendMessage', async (messageData) => {  
            console.log('Received sendMessage event:', messageData);
        
            // Ensure messageData exists and has the correct structure
            if (!messageData || typeof messageData !== 'object') {
                console.log('Error: Invalid data format', messageData);
                return;
            }
        
            // Check if messageData contains 'data' (handling the extra wrapper)
            const data = messageData.data ? messageData.data : messageData;  
            const { senderId, receiverId, content } = data;
        
            if (!content || typeof content !== 'string' || !content.trim()) {
                console.log('Error: Message content is missing or invalid', data);
                return;
            }
        
            try {
                // Store the message
                const message = await Message.create({ senderId, receiverId, content });
        
                // Emit the message to both sender and receiver
                io.to(receiverId).emit('receiveMessage', message);
                io.to(senderId).emit('receiveMessage', message);
                await ActivityLogService.logActivity(senderId,'MESSAGE SENT',`MESSAGE TO ${receiverId}`);
        
                console.log('Message sent successfully:', message);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });
        
        socket.on('typing',({senderId,receiverId})=>{
            console.log('typing is working')
            io.to(receiverId).emit('userTyping',{senderId});
        });

        socket.on('disconnect',()=>{
            console.log('A USER DISCONNECTED: ',socket.id);
        });
    });
};