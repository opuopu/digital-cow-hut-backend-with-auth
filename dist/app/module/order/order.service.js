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
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = require("./order.model");
const createAorder = (cowsid, buyerid) => __awaiter(void 0, void 0, void 0, function* () {
    const cowsdata = yield cow_model_1.default.findById(cowsid);
    const buyerdata = yield user_model_1.default.findById(buyerid);
    // let errormessage=null
    let neworderdata = null;
    if (buyerdata && cowsdata) {
        if (buyerdata.budget >= cowsdata.price && cowsdata.label === 'for sale') {
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
            console.log('sorry low budget and sold out');
        }
    }
    return neworderdata;
});
//
const getorders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.order.find({});
    return result;
});
const orderservices = {
    createAorder,
    getorders,
};
exports.default = orderservices;
