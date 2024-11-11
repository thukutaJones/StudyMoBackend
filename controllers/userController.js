const User=require('../models/user.model')


exports.getAllUsers=async (req,res)=>{
    try{
        const allUser= await User.find()
        res.status(200).json({
            status: 'succes',
            allUser
        })


    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.createUser=async (req,res)=>{
    try{
        const createdUser=await User.create(req.body)
        res.status(200).json({
            status:'sucess',
            createdUser: createdUser
        })

    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.getUser=async (req,res)=>{
    try{
        const id=req.params.id
        const user= await User.findById(id)
        res.status(200).json({
            status:'succes',
            searchedUser:user
        })

    } catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    
    }
}
exports.updateUser=async (req,res)=>{
    try{
        const id=req.params.id
        const updateData=req.body
        const updatedUser=await User.findByIdAndUpdate(id,updateData,{
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status:'success',
            updatedUser: updatedUser
        })

    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.deleteUser=async (req,res)=>{
    try{
        const id=req.body.id
        const deleteUser= await User.findByIdAndDelete(id)

        res.status(200).json({
            status:'success',
            updatedUser: deleteUser
        })

    }catch(error){
        res.status(401).json({
            status:'fail',
            error:error.message
        })
    }
}