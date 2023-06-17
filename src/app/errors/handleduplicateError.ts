import mongoose from 'mongoose'

function handleDuplicateKeyError(error: mongoose.Error): any {
  return {
    success: false,
    statusCode: 409,
    message: error.message,
    stack: error.stack,
  }
}

export default handleDuplicateKeyError
