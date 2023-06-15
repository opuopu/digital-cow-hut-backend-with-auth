import mongoose from 'mongoose'
import { IgenericErrorResponse } from '../../interfaces/igenericErrorResponse'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IgenericErrorResponse => {
  const errors = Object.values(err.errors).map(error => {
    return {
      path: error.path,
      message: error.message,
    }
  })
  const statuscode = 400
  return {
    statusCode: statuscode,
    message: 'validation error',
    errormessages: errors,
  }
}
export default handleValidationError
