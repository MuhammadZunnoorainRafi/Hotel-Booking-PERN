"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
    };
    res.cookie('auth_token', token, options);
};
exports.cookieToken = cookieToken;
