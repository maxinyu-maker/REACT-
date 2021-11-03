import {Request,Response,NextFunction} from 'express'
import HttpException from '../exceptions/http.exception'


export const errormiddleware = (error:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const message = error.message || "服务器端错误";
    const errors = error.error || "服务器端错误";
    const status = error.status || 500;
    console.log(error)
    res.status(status).json({
        flag:false,
        message:message,
        errors:errors
    })
}
