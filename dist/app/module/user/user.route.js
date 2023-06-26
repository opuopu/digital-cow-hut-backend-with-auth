"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_role_1 = require("../../../enum/user.role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.default.Router();
router.get('/my-profile', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.SELLER, user_role_1.ENUM_USER_ROLE.BUYER), user_controller_1.default.getMyProfile);
router.patch('/my-profile', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.SELLER, user_role_1.ENUM_USER_ROLE.BUYER), user_controller_1.default.updateMyProfile);
router.get('/', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.default.getalluser);
router.get('/:id', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.default.getsingleuser);
router.delete('/:id', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.default.deleteuser);
router.patch('/:id', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.default.updateuser);
exports.userRoute = router;
