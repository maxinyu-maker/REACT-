import { Schema , model , Model, Document} from "mongoose";

export interface IAccessDocument extends Document{
    name:string,
    desc:string,
}

const accessSchema:Schema = new Schema({
    name:String, //权限名称
    desc:String, //权限描述
},{
    timestamps:true,
})


const access:Model<IAccessDocument> = model<IAccessDocument>("access",accessSchema,'accesss')

export default access