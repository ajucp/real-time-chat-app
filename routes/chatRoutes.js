const express=require('express');
const ChatController=require('../controllers/chatController');

const routes=express.Router();

routes.get('/history',ChatController.getChatHistory);

module.exports=routes;