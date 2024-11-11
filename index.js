//code for the apis
const express=require('express')
const app=express()

app.use(express.json())
//app.use(express.static('./public'))


const userRout = require('./routes/user')


app.use('/api/v1/users',userRout)







module.exports = app;