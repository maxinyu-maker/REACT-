import {IStaffDocument}  from "../models/staff";

export interface JWT_Payload_Adimn {
    id:IStaffDocument['_id'],
    username:string,
    currentRole:string
  }