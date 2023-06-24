import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import jwtHelper from '../../shared/jwthelper'
import Apierror from '../errors/handleapiError'

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.refreshToken
      if (!token) {
        throw new Apierror(httpStatus.UNAUTHORIZED, 'you are not authorized')
      }

      const verifyToken = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      )
      if (!verifyToken) {
        throw new Apierror(httpStatus.NOT_FOUND, 'invalid token')
      }
      req.user = verifyToken
      if (roles.length && !roles.includes(verifyToken.role)) {
        throw new Apierror(
          httpStatus.FORBIDDEN,
          'authorization failed ! unauthorized user'
        )
      }
      return next()
    } catch (error) {
      next(error)
    }
  }
export default auth
