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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../config/secret"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel_1.default.find({}, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
exports.userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        bcrypt_1.default.hash(req.body.password, 10)
            .then(hash => {
            const user = new userModel_1.default({
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(result => {
                const token = jsonwebtoken_1.default.sign({ email: req.body.email, userId: user._id }, secret_1.default.jwtSecret, { expiresIn: '1h' });
                return res.status(201).json({
                    success: true,
                    message: 'User created!',
                    userId: user._id,
                });
            })
                .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'This email already exists!'
                });
            });
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Invalid authentication credentials!'
        });
    }
    ;
});
exports.userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fetchedUser;
    const hash = req.body.password;
    userModel_1.default.findOne({ email: req.body.email })
        .then((user) => {
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
        .then((err) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Auth failed'
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: req.body.email, userId: fetchedUser._id }, secret_1.default.jwtSecret, { expiresIn: '1h' });
        return res.status(200).json({
            userId: fetchedUser._id,
            token: token,
            expiresIn: 3600
        });
    })
        .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Invalid authentication credentials!'
        });
    });
});
//# sourceMappingURL=userController.js.map