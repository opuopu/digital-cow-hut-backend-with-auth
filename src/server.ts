import { Server } from 'http'
import mongoose from "mongoose"
import { app } from "./app"
import config from './config/index'
import { errorLogger, infoLogger } from './shared/logger'

let server: Server

async function main() {
    try {
      await mongoose.connect(`mongodb+srv://${config.dbUserName}:${config.dbPassWord}@cluster0.dgoei.mongodb.net/Cow-hut`)
      server = app.listen(config.port, () => {
        infoLogger.info(`application listening on port ${config.port}`)
      })
      infoLogger.info('database connected')
    } catch (err) {
      errorLogger.error('failed to connect database')
    }
  
    // unhandle rejection error
    process.on('unhandledRejection', error => {
      // console.log('server is closed')
      if (server) {
        server.close(() => {
          errorLogger.error(error)
          process.exit(1)
        })
      }
      {
        process.exit(1)
      }
    })
  }
  
  main()
  