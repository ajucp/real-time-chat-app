const express=require('express');

const AuthController=require('../controllers/authController');

const routes=express.Router();

routes.post('/register',AuthController.register);
routes.post('/login',AuthController.login);

module.exports=routes;

