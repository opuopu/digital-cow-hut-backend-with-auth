"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_role_1 = require("../../../enum/user.role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const cow_controller_1 = __importDefault(require("./cow.controller"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.SELLER), cow_controller_1.default.createcow);
router.get('/', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN, user_role_1.ENUM_USER_ROLE.BUYER, user_role_1.ENUM_USER_ROLE.SELLER), cow_controller_1.default.getallcows);
router.get('/:id', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.ADMIN, user_role_1.ENUM_USER_ROLE.BUYER, user_role_1.ENUM_USER_ROLE.SELLER), cow_controller_1.default.getsinglecow);
router.delete('/:id', cow_controller_1.default.deletecow);
router.patch('/:id', (0, auth_1.default)(user_role_1.ENUM_USER_ROLE.SELLER), cow_controller_1.default.updatecow);
const cowsRoute = router;
exports.default = cowsRoute;
