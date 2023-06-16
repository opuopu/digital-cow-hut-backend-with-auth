import express from 'express'
import UserController from './user.controller'

const router = express.Router()

router.get('/', UserController.getalluser)
router.get('/:id', UserController.getsingleuser)
router.delete('/:id', UserController.deleteuser)
router.patch('/:id', UserController.updateuser)

export const userRoute = router
