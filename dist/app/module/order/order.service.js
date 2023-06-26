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
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const http_status_1 = __importDefault(require("http-status"));
const handleapiError_1 = __importDefault(require("../../errors/handleapiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = require("./order.model");
const createAorder = (cowsid, buyerid, users) => __awaiter(void 0, void 0, void 0, function* () {
    const cowsdata = yield cow_model_1.default.findById(cowsid);
    const buyerdata = yield user_model_1.default.findById(buyerid);
    // cheek valid buyer
    const { id } = users;
    if (buyerid !== id) {
        throw new handleapiError_1.default(http_status_1.default.UNAUTHORIZED, 'unauthorized access, please give your valid id');
    }
    let neworderdata = null;
    if (buyerdata && cowsdata && cowsdata.label === 'for sale') {
        if (buyerdata.budget >= cowsdata.price) {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                yield cowsdata.populate('seller');
                const seller = cowsdata.seller;
                const lasttotal = buyerdata.budget - cowsdata.price;
                const sellerincome = seller.income + cowsdata.price;
                yield user_model_1.default.updateOne({ _id: buyerid }, { $set: { budget: lasttotal } }, { session });
                yield user_model_1.default.updateOne({ _id: seller._id }, { $set: { income: sellerincome } }, { session });
                yield cow_model_1.default.updateOne({ _id: cowsid }, { $set: { label: 'sold out' } }, { session });
                neworderdata = yield order_model_1.order.create([{ cow: cowsid, buyer: buyerid }], {
                    session,
                });
                if (neworderdata && neworderdata.length > 0) {
                    neworderdata[0].cow = cowsdata;
                    neworderdata[0].buyer = buyerdata;
                }
                yield session.commitTransaction();
                yield session.endSession();
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        }
        else {
            throw new Error('sorry please increase your budget.');
        }
    }
    else {
        throw new Error('something went wrong. data not found,the cow might be sold out');
    }
    return neworderdata;
});
const getorders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, id } = user;
    let result = null;
    if (role === 'admin') {
        result = yield order_model_1.order
            .find({})
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
            },
        })
            .populate('buyer');
    }
    else if (role === 'buyer') {
        result = yield order_model_1.order
            .find({ buyer: id })
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
            },
        })
            .populate('buyer');
    }
    else if (role === 'seller') {
        const orders = yield order_model_1.order
            .find()
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
            },
        })
            .populate('buyer');
        result = orders.filter(order => order.cow.seller._id.toString() === id);
    }
    else {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'something went wrong. orders not found');
    }
    return result;
});
const getsingleorder = (ids, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, id } = user;
    let result = null;
    if (role === 'admin') {
        result = yield order_model_1.order
            .findById(ids)
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'user',
            },
        })
            .populate('buyer');
    }
    else if (role === 'buyer') {
        result = yield order_model_1.order
            .findOne({ _id: ids, buyer: id })
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'user',
            },
        })
            .populate('buyer');
    }
    else if (role === 'seller') {
        const orders = yield order_model_1.order
            .findOne({ _id: ids })
            .populate('buyer')
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'user',
            },
        });
        if (orders && orders.cow.seller._id.toString() === id) {
            result = orders;
        }
    }
    else {
        throw new handleapiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied. Unauthorized role.');
    }
    return result;
});
const orderservices = {
    createAorder,
    getorders,
    getsingleorder,
};
exports.default = orderservices;
