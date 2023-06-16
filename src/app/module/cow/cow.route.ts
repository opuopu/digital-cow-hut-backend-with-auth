import express from 'express'
import cowsController from './cow.controller'

const router = express.Router()

router.post('/', cowsController.createcow)

const cowsRoute = router
export default cowsRoute
