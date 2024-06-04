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
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: process.env.POSTGRESQL_URI,
    //   database: process.env.DATABASE,
    //   host: process.env.HOST,
    //   port: +process.env.PORT!,
    //   user: process.env.USER,
    //   password: process.env.PASSWORD,
});
const executeQuery = (sql_1, ...args_1) => __awaiter(void 0, [sql_1, ...args_1], void 0, function* (sql, values = []) {
    try {
        const db = yield exports.pool.connect();
        const { rows } = yield db.query(sql, values);
        db.release();
        return rows[0];
    }
    catch (error) {
        console.log(error);
        throw new Error('Error while executing query');
    }
});
exports.executeQuery = executeQuery;
