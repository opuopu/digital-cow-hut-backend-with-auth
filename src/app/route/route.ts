import express from 'express'
import { userRoute } from '../module/user/user.route'
const router = express.Router()

const moduleRoute: any[] = [
  {
    path: '/auth/signup',
    route: userRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
]

moduleRoute.forEach(r => {
  router.use(r.path, r.route)
})

export default router
