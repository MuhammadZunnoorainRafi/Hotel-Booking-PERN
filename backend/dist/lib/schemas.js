"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogSchema = exports.userRegSchema = void 0;
const zod_1 = require("zod");
exports.userRegSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Enter name'),
    email: zod_1.z.string().min(1, 'Enter email').email('Enter a valid email address'),
    password: zod_1.z.string().min(6, 'Password must be above 5 characters'),
});
exports.userLogSchema = zod_1.z.object({
    email: zod_1.z.string().min(1, 'Enter email').email('Enter a valid email address'),
    password: zod_1.z.string().min(6, 'Password must be above 5 characters'),
});
