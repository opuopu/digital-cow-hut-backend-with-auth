import express from 'express'

import AuthRoute from '../module/auth/auth.route'
import cowsRoute from '../module/cow/cow.route'
import { userRoute } from '../module/user/user.route'
const router = express.Router()

const moduleRoute: any[] = [
  {
    path: '/auth/signup',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/cows',
    route: cowsRoute,
  },
]

moduleRoute.forEach(r => {
  router.use(r.path, r.route)
})

export default router
