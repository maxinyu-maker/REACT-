import {IStaffDocument} from "../models/staff"

declare global {
    namespace Express {
        export interface Request {
            staff?:IStaffDocument
        }
    }
}