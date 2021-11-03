import { Request,Response,NextFunction } from "express"
import HttpException from "../../exceptions/http.exception"
import jwt from "jsonwebtoken"
import config from "../../config"
import staff from "../../models/staff"
import { JWT_Payload_Adimn } from "../../types/jwt"

// interface IRequest extends Request{
//     staff?:IStaffDocument
// }

const authAdminMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    // 验证authorization
    const authorization = req.headers.authorization
    if(!authorization){
        return next(new HttpException(401,"authorization 必须提供"))
    }
    //获取 token
    const token = authorization.split('Bearer ')[1]
    if(!token){
        return next(new HttpException(401,"authorization token 必须提供,格式：Bearer token"))
    }
    try {
    //验证Token,解签  （header--加密方式，payload--放信息例如id，签名）
    const jwtData = jwt.verify(token,config.auth.adminSecretKey) as JWT_Payload_Adimn
    // { id: '61408962363d5e277744c983', iat: 1631865907, exp: 1631901907 }
    //验证用户是否存在
    const Staff = await staff.findById(jwtData.id)
    if(Staff){
        req.staff = Staff
        return next()//放过
    }else{
        return next(new HttpException(401,"staff 用户不存在"))
    }
    } catch (error) {
        //jwt 验证失败
        return next(new HttpException(401,"token 无效或者过期",error.message))
    }
}

export default authAdminMiddleware