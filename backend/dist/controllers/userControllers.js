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
exports.logoutController = exports.verifyTokenController = exports.loginController = exports.registerController = void 0;
const db_1 = require("../lib/db");
const schemas_1 = require("../lib/schemas");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../lib/utils");
// @desc Register User POST
// @route /api/user/register
// @access Public
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield db_1.pool.connect();
    try {
        const validation = schemas_1.userRegSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json(validation.error.flatten().fieldErrors);
        }
        const { name, email, password } = validation.data;
        const userExists = yield db.query('SELECT * FROM users WHERE email= $1', [
            email,
        ]);
        if (userExists.rows[0]) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield db.query('INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *', [name, email, hashedPassword]);
        if (newUser.rows[0]) {
            (0, utils_1.cookieToken)(newUser.rows[0].id, res);
            res.status(200).json({ message: 'User Created' });
        }
        else {
            return res.status(401).json({ message: 'User not created' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
    finally {
        db.release();
    }
});
exports.registerController = registerController;
// @desc Login User POST
// @route /api/user/login
// @access PUBLIC
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield db_1.pool.connect();
    try {
        const validation = schemas_1.userLogSchema.safeParse(req.body);
        if (!validation.success) {
            return res
                .status(400)
                .json({ errors: validation.error.flatten().fieldErrors });
        }
        const { email, password } = validation.data;
        const userExists = yield db.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);
        if (userExists.rows[0] &&
            (yield bcryptjs_1.default.compare(password, userExists.rows[0].password))) {
            (0, utils_1.cookieToken)(userExists.rows[0].id, res);
            res.status(200).json({ userId: userExists.rows[0].id });
        }
        else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
    finally {
        db.release();
    }
});
exports.loginController = loginController;
const verifyTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ user: req.user });
});
exports.verifyTokenController = verifyTokenController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('auth_token');
    res.send();
});
exports.logoutController = logoutController;
