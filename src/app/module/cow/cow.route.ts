import express from 'express'
import cowsController from './cow.controller'

const router = express.Router()

router.post('/', cowsController.createcow)

router.get('/', cowsController.getallcows)
router.get('/:id', cowsController.getsinglecow)
router.delete('/:id', cowsController.deletecow)
router.patch('/:id', cowsController.updatecow)

const cowsRoute = router
export default cowsRoute
