"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const secret_1 = __importDefault(require("./backend/config/secret"));
const routes_1 = __importDefault(require("./backend/routes/routes"));
const middleware_1 = __importDefault(require("./backend/middleware"));
const utils_1 = require("./backend/utils");
const errorHandlers_1 = __importDefault(require("./backend/middleware/errorHandlers"));
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});
const app = express_1.default();
const httpsOptions = {
    key: fs_1.default.readFileSync('./backend/config/key.pem'),
    cert: fs_1.default.readFileSync('./backend/config/cert.pem')
};
const mongoUrl = secret_1.default.mongoUrl;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch(() => {
    console.log('Connection failed!');
});
utils_1.applyMiddleware(middleware_1.default, app);
utils_1.applyRoutes(routes_1.default, app);
utils_1.applyMiddleware(errorHandlers_1.default, app);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token , Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
const { PORT = 3000 } = process.env;
const server = https_1.default.createServer(httpsOptions, app);
server.listen(PORT, () => console.log(`Server is running https://localhost:${PORT}...`));
exports.default = app;
//# sourceMappingURL=server.js.map