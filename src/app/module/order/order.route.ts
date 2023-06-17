import express from 'express'
import orderController from './order.controller'

const router = express.Router()

router.post('/', orderController.createorder)
router.get('/', orderController.getorder)
const orderRoute = router
export default orderRoute
