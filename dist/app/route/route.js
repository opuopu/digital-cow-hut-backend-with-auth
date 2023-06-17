'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const auth_route_1 = __importDefault(require('../module/auth/auth.route'))
const cow_route_1 = __importDefault(require('../module/cow/cow.route'))
const order_route_1 = __importDefault(require('../module/order/order.route'))
const user_route_1 = require('../module/user/user.route')
const router = express_1.default.Router()
const moduleRoute = [
  {
    path: '/auth/signup',
    route: auth_route_1.default,
  },
  {
    path: '/users',
    route: user_route_1.userRoute,
  },
  {
    path: '/cows',
    route: cow_route_1.default,
  },
  {
    path: '/orders',
    route: order_route_1.default,
  },
]
moduleRoute.forEach(r => {
  router.use(r.path, r.route)
})
exports.default = router
