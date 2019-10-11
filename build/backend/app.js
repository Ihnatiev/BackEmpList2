"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = __importDefault(require("util"));
const DBkeys_1 = __importDefault(require("./config/DBkeys"));
const IDBconnection_1 = require("./config/IDBconnection");
class MysqlConnection extends IDBconnection_1.IDBConnection {
    constructor() {
        super();
        dotenv_1.default.config();
        this.pool = mysql_1.default.createPool(DBkeys_1.default.database);
        this.pool.getConnection((error, connection) => {
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (error.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (error.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection)
                connection.release();
            return;
        });
        this.pool.query = util_1.default.promisify(this.pool.query);
        // pool event
        this.pool.on('connection', (connection) => {
            console.log('Connected to mySQL');
        });
    }
    execute(query, params = null) {
        if (params !== null) {
            return this.pool.query(query, params);
        }
        else {
            return this.pool.query(query);
        }
    }
}
exports.MysqlConnection = MysqlConnection;
//# sourceMappingURL=app.js.map