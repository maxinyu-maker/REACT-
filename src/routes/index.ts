import express,{Router} from 'express';
import * as userController from '../controller/index/user'
import adminRouter from './admin'
//接口地址：http://127.0.0.1:8000/api/private/v1/
//验证方式：token，携带方式 header
//http 响应格式 请求格式 状态码
//请求和响应的数据 格式：  json

//具体接口：
//请求路径：/user/login
//请求方法：get/post
//请求参数：{username:***,password:***}
//响应参数：{flag：true，message：******}

//路由模块化
const router:Router = express.Router()
//前台路由
router.post('/users/regist',userController.userRegit)
router.post('/users/login',userController.userLogin)
//后台路由
router.use('/admin',adminRouter)

export default router