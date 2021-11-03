import express,{Router} from 'express';
import * as staffController from '../controller/admin/staff'
import * as accessController from '../controller/admin/access'
import * as roleController from '../controller/admin/role'
import authAdminMiddleware from '../middleware/admin/authAdmin.middleware';

//后台路由
const adminRouter:Router = express.Router()
//staff
adminRouter.post('/Staff',staffController.staffLogin)
adminRouter.get('/Staff',authAdminMiddleware,staffController.staffList)
adminRouter.get('/Staff/:id',authAdminMiddleware,staffController.staffOne)
adminRouter.post('/Staff/:id/role/:roleId',authAdminMiddleware,staffController.staffRole)
adminRouter.post('/Staff/:id',authAdminMiddleware,staffController.staffRoles)
adminRouter.post('/Staff/save',authAdminMiddleware,staffController.staffSave)
adminRouter.put('/Staff/:id',authAdminMiddleware,staffController.staffUpdata)
//role
adminRouter.get('/roles',authAdminMiddleware,roleController.roleList)
adminRouter.post('/roles',authAdminMiddleware,roleController.roleSave)
adminRouter.put('/roles/:id',authAdminMiddleware,roleController.roleUpdata)
adminRouter.get('/roles/:id',authAdminMiddleware,roleController.roleOne)
adminRouter.post('/roles/:id',authAdminMiddleware,roleController.roleAccess)
//access
adminRouter.post('/access/save',authAdminMiddleware,accessController.accessSave)
adminRouter.get('/access/list',authAdminMiddleware,accessController.accessList)
adminRouter.get('/access/One/:id',authAdminMiddleware,accessController.accessOne)
adminRouter.put('/access/Updata/:id',authAdminMiddleware,accessController.accessUpdata)
adminRouter.delete('/access/delete/:id',authAdminMiddleware,accessController.accessDelete)
export default adminRouter