//user schema
const mongoose = require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us your name '],
        unique: false,
        maxlength:[30 ,'name must have less than or equal 40 characters '],
        minlength:[10 ,'name must have more than or equal 10 characters ']
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        Selection: false,
        unique: true,
        lowercase: true,
        validate:{
            validator:validator.isEmail,
            mwssage:'invalid email'}

    },password:{
        type: String,
        required:[true ,'please provide your password '],
        minlength:8,
        select: false
    },confirm:{
        type :String ,
        required:[true ,'confirm your password'],
        validate:{
            validator: function(el){
                return el==this.password 
            },
            message: 'passwords are not the same'
        }

    },
    role:{
        type: String,
        enum: {
            values: ['primary', 'secondary','university']
        },
        required:[true, 'please tell us your role']
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     immutable: true  
    // },

    district: {
        type: String,
        required: true,
        maxlength:[10,'district must have less that 10 characters'],
        minlength:[4, 'district must have more than 10 charactes']

    }
})
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bcrypt.hash(this.password,12)
    this.confirm=undefined  
    next()
})
UserSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

 
const User = mongoose.model('User', UserSchema)
module.exports = User

