import { Schema , model , Model, Document} from "mongoose";
import {IAccessDocument} from "./access"


export interface IRoleDocument extends Document{
    name:string,
    desc:string,
    // access:Schema.Types.ObjectId[]
    access:IAccessDocument['_id'][]
}

const roleSchema:Schema = new Schema({
    name:{
        type:String,
        required:[true,"role name is required"],  //model验证
        trim:true
    }, //角色名称
    desc:String, //角色描述
    access:[
        {
            type:Schema.Types.ObjectId,
            ref:'access'
        }
    ]
},{
    timestamps:true,
})


const role:Model<IRoleDocument> = model<IRoleDocument>("role",roleSchema,'roles')

export default role