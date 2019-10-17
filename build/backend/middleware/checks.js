"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpsErrors_1 = require("../utils/httpsErrors");
exports.checkUserCreate = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        throw new httpsErrors_1.HTTPS400Error("Pass email and password");
    }
    else {
        next();
    }
};
//# sourceMappingURL=checks.js.map