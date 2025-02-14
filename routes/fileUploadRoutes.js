const express=require('express');
const FileUploadController=require('../controllers/fileUploadController');
const upload=require('../middleware/uploadMiddleware');

const routes=express.Router();

routes.post('/upload',upload.array('file',10),FileUploadController.uploadFile);

module.exports=routes;