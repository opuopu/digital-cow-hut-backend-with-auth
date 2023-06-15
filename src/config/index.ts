import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUserName: process.env.MONGODB_USERNAME,
  dbPassWord: process.env.MONGODB_PASSWORD,
}
