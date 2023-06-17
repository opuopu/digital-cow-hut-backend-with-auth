import { ErrorRequestHandler, NextFunction } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/igenericErrorMessages'
import Apierror from '../errors/handleapiError'
import handleCastError from '../errors/handlecastError'

import handleValidationError from '../errors/handlevalidation'
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  // handle validation error

  let statusCode = 500
  let message = 'internal server error'
  let erromessages: IGenericErrorMessage[] = []
  if (error?.name === 'ValidationError') {
    const simplifiederror = handleValidationError(error)

    statusCode = simplifiederror.statusCode
    message = simplifiederror.message
    erromessages = simplifiederror.errormessages
  } else if (error?.name === 'CastError') {
    const simplifiederror = handleCastError(error)
    statusCode = simplifiederror.statusCode
    message = simplifiederror.message
    erromessages = simplifiederror.errormessages
  }
  // else if(error.code ===11000 ){
  //   const simplifiederror =  duplicateError(error)
  //   statusCode = simplifiederror?.statusCode
  //   message = error?.message
  //   erromessages = error?.message
  //     ? [
  //         {
  //           path: '',
  //           message: error?.message,
  //         },
  //       ]
  //     : []
  // }
  else if (error instanceof Apierror) {
    statusCode = error?.statusCode
    message = error?.message
    erromessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    erromessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    erromessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
