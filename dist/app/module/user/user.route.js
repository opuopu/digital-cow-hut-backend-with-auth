"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.default.Router();
router.get('/', user_controller_1.default.getalluser);
router.get('/:id', user_controller_1.default.getsingleuser);
router.delete('/:id', user_controller_1.default.deleteuser);
router.patch('/:id', user_controller_1.default.updateuser);
exports.userRoute = router;
