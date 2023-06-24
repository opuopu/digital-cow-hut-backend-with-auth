import express from 'express'
import { ENUM_USER_ROLE } from '../../../enum/user.role'
import auth from '../../middleware/auth'

import UserController from './user.controller'

const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getalluser)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getsingleuser)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteuser)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateuser)

export const userRoute = router
