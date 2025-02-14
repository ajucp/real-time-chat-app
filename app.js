const express=require('express');
const http=require('http');                     //for server
const {Server}=require('socket.io');    
require('dotenv').config();
const {connectDB}=require('./config/db');
const {syncDB}=require('./models');
const authRoutes=require('./routes/authRoutes');
const fileUploadRoutes=require('./routes/fileUploadRoutes');
const chatRoutes=require('./routes/chatRoutes')
const chatSocket=require('./websocket/chatSocket');


const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*',                     //allows all origins(adjust for production)
    }                       
});

chatSocket(io);     //websocket logic

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/files',fileUploadRoutes);
app.use('/api/chat',chatRoutes)


connectDB();    //connecting to the db
syncDB();       //sync the models

const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
