import { IGenericErrorMessage } from './igenericErrorMessages'

export type IgenericErrorResponse = {
  statusCode: number
  message: string
  errormessages: IGenericErrorMessage[]
}
