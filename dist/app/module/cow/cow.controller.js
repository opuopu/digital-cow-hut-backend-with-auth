'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const catchasync_1 = __importDefault(require('../../../shared/catchasync'))
const pick_1 = __importDefault(require('../../../shared/pick'))
const cow_constant_1 = require('./cow.constant')
const cow_service_1 = __importDefault(require('./cow.service'))
const createcow = (0, catchasync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_service_1.default.createAcow(req.body)
    res.send({
      success: true,
      statusCode: 200,
      message: 'cow created  successfully',
      data: result,
    })
  })
)
const getsinglecow = (0, catchasync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_service_1.default.getSinglCow(req.params.id)
    res.send({
      success: true,
      statusCode: 200,
      message: 'cow retrieved  successfully',
      data: result,
    })
  })
)
//   get all
// steps 1. create a pick function for query req.query
// step 2 calculatte sorting and paginations options using calculatepagination
// const getallcows = catchAsync(async (req: Request, res: Response) => {
//   const filters: FilterableFields = pick(req.query, filterableField)
//   const paginationOptions = pick(req.query, items)
//   const result = await cowsService.getAllcows(filters, paginationOptions)
//   res.send({
//     success: true,
//     statusCode: 200,
//     meta: result.meta,
//     message: 'cows retrieved  successfully',
//     data: result.data,
//   })
// })
const getallcows = (0, catchasync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      cow_constant_1.filterableField
    )
    const paginationOptions = (0, pick_1.default)(
      req.query,
      cow_constant_1.items
    )
    const result = yield cow_service_1.default.getAllcows(
      filters,
      paginationOptions
    )
    res.send({
      success: true,
      statusCode: 200,
      meta: result.meta,
      message: 'cows retrieved  successfully',
      data: result.data,
    })
  })
)
// delete user
const deletecow = (0, catchasync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_service_1.default.deleteCow(req.params.id)
    res.send({
      success: true,
      statusCode: 200,
      message: 'cows deleted   successfully',
      data: result,
    })
  })
)
// update
const updatecow = (0, catchasync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_service_1.default.updateCow(
      req.params.id,
      req.body
    )
    res.send({
      success: true,
      statusCode: 200,
      message: 'cow updated   successfully',
      data: result,
    })
  })
)
const cowsController = {
  createcow,
  getsinglecow,
  getallcows,
  deletecow,
  updatecow,
}
exports.default = cowsController
