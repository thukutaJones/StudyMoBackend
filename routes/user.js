const express=require('express')

const rout=express.Router()
const authoController=require('../controllers/authController')
const controller=require('../controllers/userController')



rout.route('/signup').post(authoController.signUp)
rout.route('/login').post(authoController.logIn)
rout.route('/').get(controller.getAllUsers).post(controller.createUser)
rout.route('/:id').get(controller.getUser).patch(controller.updateUser)

module.exports=rout
