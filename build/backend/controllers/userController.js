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
const userService_1 = require("../services/userService");
const user_1 = require("../usecases/user");
const secret_1 = __importDefault(require("../config/secret"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor(dbConnection) {
        this.userService = new userService_1.UserService(dbConnection);
    }
    ;
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            const useCase = new user_1.CreateUser(this.userService);
            try {
                bcrypt_1.default.hash(req.body.password, 12)
                    .then((hash) => __awaiter(this, void 0, void 0, function* () {
                    yield useCase.execute(name, email, hash)
                        .then(user => {
                        return res.status(201).json({
                            success: true,
                            message: 'User created!',
                            userId: user.id,
                        });
                    })
                        .catch(err => {
                        res.status(500).json({
                            success: false,
                            message: 'This email already exists!'
                        });
                    });
                }));
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Invalid authentication credentials!'
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fetchedUser;
            const hash = req.body.password;
            this.userService.find(req.body.email)
                .then(user => {
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Auth failed! Check your email and password.'
                    });
                }
                ;
                fetchedUser = user;
                return bcrypt_1.default.compare(req.body.password, hash);
            })
                .then(err => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Auth failed'
                    });
                }
                const token = jsonwebtoken_1.default.sign({ email: fetchedUser.email, userId: fetchedUser.id }, secret_1.default.jwtSecret, { expiresIn: '1h' });
                return res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: fetchedUser.id,
                    uName: fetchedUser.name
                });
            })
                .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Invalid authentication credentials!'
                });
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map