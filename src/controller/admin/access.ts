import {Request,Response,NextFunction} from 'express'
import HttpException from '../../exceptions/http.exception'
import { validateAccessSave } from '../../utils/varidtor/admin/access.validator'
import access from '../../models/access'

//access 保存
export const accessSave = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let {name,desc} = req.body
        //接口数据验证
        let {errors,validate} = validateAccessSave(name,desc)
        if(!validate){
            throw new HttpException(422,"Access 验证错误",errors)
        }

        //业务验证
        const accessFind = await access.findOne({name})
        if(accessFind){
            throw new HttpException(422,"权限命名已存在")
        }
        //2.验证密码
        const accessNew = new access({name,desc})
        const accessSave = await accessNew.save()
        res.json({
            flag:true,
            data:{
                message:"创建成功",
                access:accessSave,
            }
        })
    }catch(error){
        next(error)
    }
}

//access 更新
export const accessUpdata = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let {id} = req.params
        let {name,desc} = req.body
        //接口数据验证
        let {errors,validate} = validateAccessSave(name,desc)
        if(!validate){
            throw new HttpException(422,"Access 传参验证错误",errors)
        }
        //默认返回的是修改前的对象
        //添加配置项：options ：{new:true}，返回修改后的对象
        const accessUpdata = await access.findByIdAndUpdate(id,{name,desc})
        res.json({
            flag:true,
            data:{
                message:"更新成功",
                access:accessUpdata,
            }
        })
    }catch(error){
        next(error)
    }
}

//access 列表
export const accessList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const accessList = await access.find({})
        res.json({
            flag:true,
            data:{
                message:"获取权限列成功",
                access:accessList,
            }
        })
    }catch(error){
        next(error)
    }
}

//access 详情
export const accessOne = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params
        const accessFind = await access.findById(id)
        if(!accessFind){
            throw new HttpException(422,"Access 不存在")
        }

        res.json({
            flag:true,
            data:{
                message:"获取权限详情成功",
                access:accessFind,
            }
        })
    }catch(error){
        next(error)
    }
}

//access 删除
export const accessDelete = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params
        //业务验证：access 是否存在
        const accessFind = await access.findById(id)
        if(!accessFind){
            throw new HttpException(422,"权限不存在")
        }

        const accessDelete = await access.findByIdAndDelete(id);
        res.json({
            flag:true,
            data:{
                message:"删除成功",
                access:accessDelete,
            }
        })
    }catch(error){
        next(error)
    }
}