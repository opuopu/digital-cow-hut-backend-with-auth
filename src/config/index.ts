import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUserName: process.env.MONGODB_USERNAME,
  dbPassWord: process.env.MONGODB_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_In: process.env.JWT_REFRESH_EXPIRES_IN,
  },
}
