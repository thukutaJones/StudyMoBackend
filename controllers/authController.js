const jwt=require('jsonwebtoken')
const User=require('../models/user.model')

signinToken=function(id){
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JTW_EXPIRE_IN    
    })
}
exports.signUp=async (req,res,next)=>{
    try{
        const newUser= await User.create(req.body)
        const token=signinToken(newUser._id)

        res.status(200).json({
            status:'succes',
            token:token,
            data:newUser
        })


    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
    
}
exports.logIn=async (req,res,next)=>{
    try{
        const   {email,password}=req.body
        // checking if email and password exis from bosy
        if(!email || !password){
            return res.status(400).json({
                status:'fail',
                message:'please give us your email and password to login'
            })
        }

      
        //checking if user and password exist
        const user=await User.findOne({email}).select('+password')
    
        if(!user || !(await user.correctPassword(password,user.password))){
            return res.status(401).json({
                status:'fail',
                message:'incorrect password or email'
            })
        }



        //sending token
        const token=signinToken(user._id)
        res.status(200).json({
            status:'success',
            user,   
            token
        })

    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
    
}
