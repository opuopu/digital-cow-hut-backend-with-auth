import httpStatus from 'http-status'
import mongoose from 'mongoose'

function handleDuplicateKeyError(error: mongoose.Error) {
  const message = error.message

  const statusCode = httpStatus.CONFLICT
  return {
    success: false,
    statusCode,
    message: message,
    errormessages: [
      {
        path: '',
        message: message,
      },
    ],
    stack: error.stack,
  }
}
export default handleDuplicateKeyError
