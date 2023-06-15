import express from 'express'
const router = express.Router()

const moduleRoute: any[] = []

moduleRoute.forEach(r => {
  router.use(r.path, r.route)
})

export default router
