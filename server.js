const mongoose=require('mongoose')
const dotEnv=require('dotenv')
dotEnv.config({path:'./config.env'})
const app=require('./index')

// console.log(process.env)
const DB=process.env.DATABASE.replace('{db_password}',process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(con=>{
    console.log('DB connect successful')
}).catch(error=>{
    console.log(error)
})



process.removeAllListeners('warning')

app.listen(process.env.PORT,()=>{
    console.log(`app runing on port ${process.env.PORT}...`)
})