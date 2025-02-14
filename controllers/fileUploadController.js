const fileQueue=require('../queues/fileUploadQueue');
const ActivityLogService=require('../services/activityLogService');


exports.uploadFile=async(req,res)=>{
    console.log('FILE UPLOAD CONTROLLER');
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const jobs=[];

        //adding to queue
        for (const file of req.files){

            const job=await fileQueue.add({
                userId:req.body.userId,
                filename:file.filename,
                filetype:file.mimetype,
                filepath:file.path
            });

            jobs.push({jobId:job.id,filename:file.filename});

            await ActivityLogService.logActivity(req.body.userId,'FILE UPLOADED',file.filename)
        }

        res.status(200).json({message:'BULK FILE UPLOAD IN PROGRESS',jobs});
    } catch (err) {
        console.log('uploaded error',err)
        res.status(500).json({error:'FILE UPLAOD FAILED',details:err.message});
    }
}