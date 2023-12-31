import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: object,
  secret: Secret,
  options: object
): string => {
  return jwt.sign(payload, secret, options)
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}
const jwtHelper = {
  createToken,
  verifyToken,
}
export default jwtHelper
