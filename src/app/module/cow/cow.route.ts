import express from 'express'
import { ENUM_USER_ROLE } from '../../../enum/user.role'
import auth from '../../middleware/auth'
import cowsController from './cow.controller'

const router = express.Router()

router.post('/', auth(ENUM_USER_ROLE.SELLER), cowsController.createcow)

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  cowsController.getallcows
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  cowsController.getsinglecow
)
router.delete('/:id', cowsController.deletecow)
router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), cowsController.updatecow)

const cowsRoute = router
export default cowsRoute
