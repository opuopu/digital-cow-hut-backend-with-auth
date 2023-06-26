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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const order_service_1 = __importDefault(require("./order.service"));
const createorder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = req.body;
    const result = yield order_service_1.default.createAorder(cow, buyer, req.user);
    res.send({
        success: true,
        message: 'Orders created successfully',
        data: result,
    });
}));
// get
const getorder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_service_1.default.getorders(user);
    res.send({
        success: true,
        statusCode: 200,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
// getsingleorder
const getSingleOrder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_service_1.default.getsingleorder(req.params.id, user);
    res.send({
        success: true,
        statusCode: 200,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const orderController = {
    createorder,
    getorder,
    getSingleOrder,
};
exports.default = orderController;
