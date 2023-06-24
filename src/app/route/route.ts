import express from 'express'

import { AdminRoute } from '../module/admin/admin.route'
import AuthRoute from '../module/auth/auth.route'
import cowsRoute from '../module/cow/cow.route'
import orderRoute from '../module/order/order.route'
import { userRoute } from '../module/user/user.route'
const router = express.Router()

const moduleRoute: any[] = [
  {
    path: '/auth',
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
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
]

moduleRoute.forEach(r => {
  router.use(r.path, r.route)
})

export default router
