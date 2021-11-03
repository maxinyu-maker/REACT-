import express,{Express} from 'express'
import router from './routes'
import { mismatch } from './middleware/mismatch.middleware'
import { errormiddleware } from './middleware/error.middleware'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from "./config"
import md5 from "md5"
import staff from './models/staff'

const app:Express = express()

//数据处理中间件
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

//定义路由
app.use('/api',router)

//404
app.use(mismatch)

//错误  中间件
app.use(errormiddleware)

//启动数据库
//所有的配置应该是动态的（方便不同的环境 开发  测试  线上  生产）
const initDB = async ():Promise<void>=>{
    const mongodbURL = `${config.db.host}:${config.db.port}/${config.db.database}`
    await mongoose.connect(mongodbURL)
    console.log("Connect to mongodb success")
}

//启动服务
const initSever = async ():Promise<boolean>=>{
    return new Promise((resolve,reject)=>{
        app.listen('8000',()=>{
            console.log("server is running")
            resolve(true)
        })
        .on("error",error=>{
            console.log(error)
            reject(error)
        })
    } )
}

//创建超级管理员
const initAdmin =async ():Promise<any>=>{
    try {
        const superConfig = config.superAdmin
        //用户名唯一
        const username = superConfig.username
        const superAdmin = await staff.findOne({username})
        if (superAdmin) return
        const password = md5(superConfig.password)
        //创建模型
        const staffModel =  new staff({username,password,isSuper:true})
        await staffModel.save()
        console.log('Super admin create success')
    } catch (error) {
        console.log(error.message)
        return Promise.reject(false)
    }

}

const main = async ()=>{
    await initDB()
    await initSever()
    await initAdmin()
}

main()