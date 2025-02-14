const multer=require('multer');
const path=require('path');

//config the storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')         //saving folder
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix+path.extname(file.originalname));
    }
});


//validating the file
const fileFilter=(req,file,cb)=>{
    const allowedTypes = ['application/pdf', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error('INVALID FILE TYPE.ALLOWED FORMATS:PDF,JPEG,XLSX,DOCX'),false);
    }
};

//multer config
const upload=multer({storage,fileFilter});

module.exports=upload;