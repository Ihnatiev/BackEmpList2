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
const IUser_1 = require("../interfaces/IUser");
class UserService extends IUser_1.IUser {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    ;
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute('INSERT INTO Users SET name = ?, email = ?, password = ?', [
                user.name,
                user.email,
                user.password
            ]);
            user.id = result.insertId;
            return user;
        });
    }
    ;
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResults = yield this.connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
            return queryResults[0];
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map