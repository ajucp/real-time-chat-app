const Queue=require('bull');
const {fileUpload, FileUpload}=require('../models');

//initialize queue
const fileQueue=new Queue('fileUpload',{
    redis:{
        host:process.env.REDIS_HOST || '127.0.0.1',
        port:process.env.REDIS_PORT || 6379
    }
});

//process queue
fileQueue.process(async(job,done)=>{
    try {
        const{userId,filename,filetype,filepath}=job.data;

        //save into db
        await FileUpload.create({userId,filename,filetype,filepath});

        console.log(`File Uploaded:${filename}`);
        done();

    } catch (err) {
        console.log('Error Processing File: ',err);
        done(err)
    }
});

module.exports=fileQueue;