import {Request,Response,NextFunction} from 'express'
import staff from '../../models/staff'
import HttpException from '../../exceptions/http.exception'
import md5 from 'md5'
import {validateLogin} from '../../utils/varidtor/admin/staff.validator'
import jwt from "jsonwebtoken"
import config from "../../config"
import role from '../../models/role'
import { JWT_Payload_Adimn } from '../../types/jwt'

const generateToken = (payload:JWT_Payload_Adimn)=>{
    let privateKey = config.auth.adminSecretKey
    let options = {expiresIn : '10h'}
    const token = jwt.sign(payload,privateKey,options)
    return token
}

export const staffLogin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    let {username,password} = req.body

    //接口数据验证
    let {error,validate} = validateLogin(username,password)

    if(!validate){
        throw new HttpException(422,"Staff 验证错误",error)
    }
    //业务验证：1.验证员工是否存在
    const Staff = await staff.findOne({username})
    if(!Staff){
        throw new HttpException(422,"staff not fond")
    }
    //2.验证密码
    const match = md5(password) === Staff.password
    if(!match){
        throw new HttpException(422,"password not match")
    }
    // 3.生成一个token
    const payload = {id:Staff._id,username:Staff.username,currentRole:'admin'}
    const token = generateToken(payload)
    // 返回结果
    res.json({
        flag:true,
        data:{
            token,
            username:Staff.username
        }
    })
    }catch(error){
        next(error)
    }
}

//staff 列表
export const staffList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    const list = await staff.find({}).populate('role')
    // 返回结果
    res.json({
        flag:true,
        data:list
    })
    }catch(error){
        next(error)
    }
}

//staff 查询一个
export const staffOne = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    const {id} = req.params
    const One = await staff.findById(id)
    // 返回结果
    res.json({
        flag:true,
        data:One
    })
    }catch(error){
        next(error)
    }
}

//staff 保存
export const staffSave = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    let {username,password} = req.body

     //接口数据验证
     let {error,validate} = validateLogin(username,password)
     if(!validate){
         throw new HttpException(422,"Staff 验证错误",error)
     }
     //业务验证：1.验证员工是否存在
     const Staff = await staff.findOne({username})
     if(Staff){
         throw new HttpException(422,"员工已经存在")
     }
     const staffNew = new staff({
         username,
         password:md5(password)
     })
     const staffSave = await staffNew.save()
    // 返回结果
    res.json({
        flag:true,
        data:{
            message:"创建成功",
            staff:staffSave
        }
    })
    }catch(error){
        next(error)
    }
}


//staff 修改
export const staffUpdata = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    let {id} = req.params
    let {username,password} = req.body

     //接口数据验证
     let {error,validate} = validateLogin(username,password)
     if(!validate){
         throw new HttpException(422,"Staff 验证错误",error)
     }
     //业务验证：1.验证员工是否存在
     const Staff = await staff.findOne({username})
     if(Staff){
         throw new HttpException(422,"修改用户不存在")
     }
     const staffUpdata = await staff.findByIdAndUpdate(id,{username,password:md5(password)},{new:true})

    // 返回结果
    res.json({
        flag:true,
        data:{
            message:"更新成功",
            staff:staffUpdata
        }
    })
    }catch(error){
        next(error)
    }
}

//staff 分配单角色
export const staffRole = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    let {id,roleId} = req.params
    //验证员工是否存在
    const Staff = await staff.findById(id)
    if(!Staff){
        throw new HttpException(422,"被分配角色不存在")
    }
    //验证角色是否存在
    const Role = await role.findById(roleId)
    if(!Staff){
        throw new HttpException(422,"分配角色不存在")
    }

    Staff.role = roleId
    
    const staffRole = await Staff.save()

    // 返回结果
    res.json({
        flag:true,
        data:{
            message:"分配成功",
            staff:staffRole
        }
    })
    }catch(error){
        next(error)
    }
}


//staff 分配多角色
export const staffRoles = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    let {id} = req.params
    let {roleIds} = req.body
    //验证员工是否存在
    const Staff = await staff.findById(id)
    if(!Staff){
        throw new HttpException(422,"被分配角色不存在")
    }

    Staff.roles = roleIds
    const staffRole = await Staff.save()

    // 返回结果
    res.json({
        flag:true,
        data:{
            message:"分配成功",
            staff:staffRole
        }
    })
    }catch(error){
        next(error)
    }
}