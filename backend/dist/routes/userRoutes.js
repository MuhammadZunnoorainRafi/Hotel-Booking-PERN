"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const usersRoute = express_1.default.Router();
usersRoute.post('/register', userControllers_1.registerController);
usersRoute.post('/login', userControllers_1.loginController);
usersRoute.get('/validate-token', authMiddleware_1.verifyToken, userControllers_1.verifyTokenController);
usersRoute.post('/logout', userControllers_1.logoutController);
exports.default = usersRoute;
