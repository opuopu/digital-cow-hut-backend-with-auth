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
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const handleapiError_1 = __importDefault(require("../../errors/handleapiError"));
const user_model_1 = __importDefault(require("./user.model"));
// get all user
const getallUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find({});
    if (!result) {
        throw new handleapiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return result;
});
// get single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById({ _id: id });
    return result;
});
// delete a user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
// updateAuser
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// login a user
// get profile
const getmyprofile = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = users;
    const result = yield user_model_1.default.findOne({ _id: id });
    if (!result) {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    return result;
});
// updateProfile
const updateprofile = (users, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = users;
    const { name } = payload, others = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, others);
    if (payload.password) {
        const hasspassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_round));
        updatedUserData.password = hasspassword;
    }
    // dynamic update
    if (name && Object.keys(name).length) {
        Object.entries(name).forEach(([key, value]) => {
            const newNameKey = `name.${key}`;
            updatedUserData[newNameKey] = value;
        });
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    if (!result) {
        throw new handleapiError_1.default(404, 'something went wrong');
    }
    return result;
});
const userService = {
    getallUser,
    getSingleUser,
    deleteUser,
    updateUser,
    getmyprofile,
    updateprofile,
};
exports.default = userService;
