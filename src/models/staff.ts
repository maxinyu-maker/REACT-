import { Schema , model , Model, Document} from "mongoose";
import { IRoleDocument } from "./role";

export interface IStaffDocument extends Document{
    username:string,
    password:string,
    role:IRoleDocument['_id'],
    roles:IRoleDocument['_id'][],
}

const staffSchema:Schema = new Schema({
    username:String,
    password:String,
    isSuper:{
        type:Boolean,
        default:false
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'role'
    },
    roles:[
        {
        type:Schema.Types.ObjectId,
        ref:'role'
        }
    ]
},{
    timestamps:true,
})


const staff:Model<IStaffDocument> = model<IStaffDocument>("staff",staffSchema,'staffs')

export default staff