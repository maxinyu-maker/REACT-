import validator from 'validator'

interface RoleError {
    name?: string,
    desc?: string
}

export const validateRoleSave = (name:string,desc:string)=>{
    
    let errors:RoleError = {}

    if(validator.isEmpty(name)){
        errors.name = "权限名称不能为空"
    }
    if(validator.isEmpty(desc)){
        errors.desc = "权限描述不能为空"
    }

    let validate = Object.keys(errors).length<1

    return {errors,validate};
}