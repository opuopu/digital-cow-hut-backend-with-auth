import express from 'express'
import createauthUser from './auth.controller'
const router = express.Router()

router.post('/', createauthUser)

const AuthRoute = router
export default AuthRoute
