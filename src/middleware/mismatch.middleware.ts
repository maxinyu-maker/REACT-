import {Request,Response,NextFunction} from 'express'
import HttpException from '../exceptions/http.exception'


export const mismatch = (req:Request,res:Response,next:NextFunction)=>{
    // res.status(404).json({
    //     flag:false,
    //     message:"Router is not found"
    // })

    const mismatchError:HttpException = new HttpException(404,"访问路径不匹配")
    next(mismatchError)
}
