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
const userController_1 = require("../controllers/userController");
const SearchController_1 = require("../controllers/SearchController");
const checks_1 = require("../middleware/checks");
const employeeController_1 = require("../controllers/employeeController");
const app_1 = require("../app");
const mysqlConnection = new app_1.MysqlConnection();
const employeesController = new employeeController_1.EmployeesController(mysqlConnection);
exports.default = [
    {
        path: "/api/users",
        method: "get",
        handler: [userController_1.findUsers]
    },
    {
        path: "/api/auth/signup",
        method: "post",
        handler: [checks_1.checkUserCreate, userController_1.userCreate]
    },
    {
        path: "/api/auth/login",
        method: "post",
        handler: [userController_1.userLogin]
    },
    {
        path: "/api/employees",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let results = yield employeesController.findAllEmployees(req, res);
                res.send(results);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield employeesController.findEmployee(req, res);
                res.send(result);
            })
        ]
    },
    {
        path: "/api/employees/",
        method: "post",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield employeesController.createEmployee(req, res);
                res.send(result);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "put",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield employeesController.updateEmployee(req, res);
                res.send(result);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "delete",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield employeesController.deleteEmployee(req, res);
                res.send(result);
            })
        ]
    },
    {
        path: "/api/v1/search",
        method: "get",
        handler: [
            checks_1.checkSearchParams,
            ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield SearchController_1.getPlacesByName(query.q);
                res.status(200).send(result);
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map