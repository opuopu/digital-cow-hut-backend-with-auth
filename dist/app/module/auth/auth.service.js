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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwthelper_1 = __importDefault(require("../../../shared/jwthelper"));
const handleapiError_1 = __importDefault(require("../../errors/handleapiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const createAuthUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(users);
    if (!result) {
        throw new handleapiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return result;
});
const loginuser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const users = new user_model_1.default();
    const isUserExist = yield users.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const { role } = isUserExist;
    if (isUserExist.password &&
        !(yield users.isPassWordMatched(password, isUserExist.password))) {
        throw new handleapiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const getuser = yield user_model_1.default.findOne({ phoneNumber: phoneNumber }, { _id: 1 });
    if (!getuser) {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'admin not found');
    }
    // accessToken
    const accessToken = jwthelper_1.default.createToken({ id: getuser.id, role: role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.jwt_expires_in,
    });
    const refreshToken = jwthelper_1.default.createToken({ id: getuser._id, role: role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.jwt_expires_in,
    });
    return {
        accessToken,
        refreshToken,
    };
});
// refreshToken
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwthelper_1.default.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new handleapiError_1.default(404, 'invalid token');
    }
    // step 2 cheek if user exists or not
    const { id } = verifyToken;
    const getuser = yield user_model_1.default.findById(id);
    if (!getuser) {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'invalid user id,user not found on database');
    }
    const { phoneNumber } = getuser;
    const users = new user_model_1.default();
    const isUserExists = yield users.isUserExist(phoneNumber);
    if (!isUserExists) {
        throw new handleapiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    // step 3 generate new token
    const accessToken = jwthelper_1.default.createToken({ id: getuser.id, role: isUserExists.role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.jwt_expires_in,
    });
    return {
        accessToken,
    };
});
const authservices = {
    createAuthUser,
    loginuser,
    refreshToken,
};
exports.default = authservices;
