/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'

let server: Server

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.dbUserName}:${config.dbPassWord}@cluster0.dgoei.mongodb.net/Cow-hut`
    )
    server = app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
    console.log('database connected')
  } catch (err) {
    console.log('failed to connect database')
  }

  // unhandle rejection error
  process.on('unhandledRejection', error => {
    // console.log('server is closed')
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    }
    {
      process.exit(1)
    }
  })
}

main()
