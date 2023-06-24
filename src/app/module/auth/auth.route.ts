import express from 'express'
import authcontroller from './auth.controller'
const router = express.Router()

router.post('/signup', authcontroller.createauthUser)
router.post('/login', authcontroller.loginUser)
router.post('/refresh-token', authcontroller.refreshToken)
const AuthRoute = router
export default AuthRoute
