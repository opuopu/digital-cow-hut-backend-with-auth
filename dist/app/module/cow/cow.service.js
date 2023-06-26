"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = __importDefault(require("../../../shared/paginationHelper"));
const handleapiError_1 = __importDefault(require("../../errors/handleapiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const createAcow = (cows, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    if (id !== cows.seller) {
        throw new handleapiError_1.default(http_status_1.default.UNAUTHORIZED, "cows not created,please give your valid id in seller property's");
    }
    const result = (yield cow_model_1.default.create(cows)).populate('seller');
    if (!result) {
        throw new handleapiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return result;
});
const getAllcows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortOrder, sortBy } = (0, paginationHelper_1.default)(paginationOptions);
    const filter = {};
    const { searchTerm } = filters, fields = __rest(filters, ["searchTerm"]);
    if (fields.minPrice) {
        filter.price = { $gte: Number(fields.minPrice) };
    }
    if (fields.maxPrice) {
        filter.price = Object.assign(Object.assign({}, filter.price), { $lte: Number(fields.maxPrice) });
    }
    if (fields.location) {
        filter.location = { $regex: fields.location, $options: 'i' };
    }
    // pagination
    const sort = {};
    if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder;
    }
    const filterableFieldss = ['location', 'category', 'breed'];
    if (searchTerm) {
        filterableFieldss.map(field => {
            filter.$or = filter.$or || [];
            filter.$or.push({ [field]: { $regex: searchTerm, $options: 'i' } });
        });
    }
    const result = yield cow_model_1.default
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('seller');
    return {
        meta: {
            page: page,
            limit: limit,
        },
        data: result,
    };
});
// cheek
//   get single cows
const getSinglCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById({ _id: id }).populate('seller');
    return result;
});
//   patch cow
const updateCow = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield cow_model_1.default.findOne({ _id: id, seller: user.id });
    if (!cows) {
        throw new handleapiError_1.default(http_status_1.default.UNAUTHORIZED, 'Cow not found or unauthorized access');
    }
    const result = yield cow_model_1.default
        .findOneAndUpdate({ _id: id }, payload, {
        new: true,
    })
        .populate('seller');
    return result;
});
//   delete
const deleteCow = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield cow_model_1.default.findOne({ _id: id, seller: user.id });
    if (!cows) {
        throw new handleapiError_1.default(http_status_1.default.UNAUTHORIZED, 'Cow not found or unauthorized access');
    }
    const result = yield cow_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
const cowsService = {
    createAcow,
    getAllcows,
    getSinglCow,
    updateCow,
    deleteCow,
};
exports.default = cowsService;
