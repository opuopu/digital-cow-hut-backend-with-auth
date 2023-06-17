"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = __importDefault(require("./cow.controller"));
const router = express_1.default.Router();
router.post('/', cow_controller_1.default.createcow);
router.get('/', cow_controller_1.default.getallcows);
router.get('/:id', cow_controller_1.default.getsinglecow);
router.delete('/:id', cow_controller_1.default.deletecow);
router.patch('/:id', cow_controller_1.default.updatecow);
const cowsRoute = router;
exports.default = cowsRoute;
