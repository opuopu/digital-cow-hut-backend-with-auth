import express from 'express'
import { ENUM_USER_ROLE } from '../../../enum/user.role'
import auth from '../../middleware/auth'
import orderController from './order.controller'

const router = express.Router()

router.post('/', auth(ENUM_USER_ROLE.BUYER), orderController.createorder)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  orderController.getSingleOrder
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  orderController.getorder
)
const orderRoute = router
export default orderRoute
