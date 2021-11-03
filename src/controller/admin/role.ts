
import {Request,Response,NextFunction} from 'express'
import HttpException from '../../exceptions/http.exception'
import { validateAccessSave } from '../../utils/varidtor/admin/access.validator'
import role from '../../models/role'
import { validateRoleSave } from '../../utils/varidtor/admin/role.validator '

//role 保存
export const roleSave = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let {name,desc} = req.body
        //接口数据验证
        let {errors,validate} = validateRoleSave(name,desc)
        if(!validate){
            throw new HttpException(422,"Role 验证错误",errors)
        }

        //业务验证: 角色名称唯一
        const roleFind = await role.findOne({name})
        if(roleFind){
            throw new HttpException(422,"角色命名已存在")
        }
        //2.验证密码
        const roleNew = new role({name,desc})
        const roleSave = await roleNew.save()
        res.json({
            flag:true,
            data:{
                message:"创建成功",
                role:roleSave,
            }
        })
    }catch(error){
        next(error)
    }
}

//role 更新
export const roleUpdata = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let {id} = req.params
        let {name,desc} = req.body
        //接口数据验证
        let {errors,validate} = validateRoleSave(name,desc)
        if(!validate){
            throw new HttpException(422,"role 传参验证错误",errors)
        }
        //业务验证: 角色名称唯一
        const roleFind = await role.findById(id)
        if(!roleFind){
            throw new HttpException(422,"角色不存在")
        }
        //默认返回的是修改前的对象
        //添加配置项：options ：{new:true}，返回修改后的对象
        const roleUpdata = await role.findByIdAndUpdate(id,{name,desc})
        res.json({
            flag:true,
            data:{
                message:"更新成功",
                role:roleUpdata,
            }
        })
    }catch(error){
        next(error)
    }
}

//role 列表
export const roleList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const roleList = await role.find({}).populate('access')
        res.json({
            flag:true,
            data:{
                message:"获取角色成功",
                role:roleList,
            }
        })
    }catch(error){
        next(error)
    }
}

//role 详情
export const roleOne = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params
        const roleFind = await role.findById(id).populate('access')
        if(!roleFind){
            throw new HttpException(422,"role 不存在")
        }

        res.json({
            flag:true,
            data:{
                message:"获取权限详情成功",
                role:roleFind,
            }
        })
    }catch(error){
        next(error)
    }
}

//role 授权
export const roleAccess = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params //角色id
        let {accessIds} = req.body  //被授权的多个权限

        //业务验证：角色是否存在
        const roleFind = await role.findById(id)
        if(!roleFind){
            throw new HttpException(422,"role 不存在")
        }

        roleFind.access = accessIds
        const roleSave = await roleFind.save()

        res.json({
            flag:true,
            data:{
                message:"角色授权成功",
                role:roleSave,
            }
        })
    }catch(error){
        next(error)
    }
}
