import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, prettyPrint, label } = winston.format

export const infoLogger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: combine(timestamp(), label({ label: 'COW' }), prettyPrint()),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'success',
        'cow-hut-s-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})

export const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(timestamp(), label({ label: 'COW' }), prettyPrint()),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'errors',
        'cow-hut-s-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})
