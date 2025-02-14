const AuthService=require('../services/authService');
const Joi=require('joi');

exports.register=async(req,res)=>{
    console.log('REGISTER AUTH-CONTROLLER');

    try {
        const schema=Joi.object({                   //Checking the validation
            username:Joi.string().min(3).required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(6).required(),
        });

        const {error}=schema.validate(req.body);
        if(error) return res.status(400).json({error:error.details[0].message});

        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;

        const user=await AuthService.register(username,email,password);
        res.status(201).json({message:'USER REGISTER SUCCESSFULLY',user})

    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

exports.login=async(req,res)=>{
    console.log('LOGIN AUTH-CONTROLLER');
    try {
        const schema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required(),
        });

        const {error}=schema.validate(req.body);
        if(error) return res.status(400).json({error:error.details[0].message});

        const email=req.body.email;
        const password=req.body.password;

        const result=await AuthService.login(email,password);
        res.status(200).json({message:'LOGIN SUCCESSFULLY',token:result.token,user:result.user});
        
    } catch (err) {
        res.status(402).json({error:err.message});
    }
}