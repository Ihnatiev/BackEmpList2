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
const checks_1 = require("../middleware/checks");
const employeeController_1 = require("../controllers/employeeController");
const userController_1 = require("../controllers/userController");
const check_auth_1 = require("../middleware/check-auth");
const app_1 = require("../app");
const mysqlConnection = new app_1.MysqlConnection();
const employeesController = new employeeController_1.EmployeesController(mysqlConnection);
const userController = new userController_1.UserController(mysqlConnection);
exports.default = [
    {
        path: "/api/auth/signup",
        method: "post",
        handler: [checks_1.checkUserCreate,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield userController.createUser(req, res);
            })
        ]
    },
    {
        path: "/api/auth/login",
        method: "post",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield userController.loginUser(req, res);
            })
        ]
    },
    {
        path: "/api/employees",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield employeesController.findAllEmployees(req, res);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield employeesController.findEmployee(req, res);
            })
        ]
    },
    {
        path: "/api/employees/",
        method: "post",
        handler: [check_auth_1.checkJwt,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield employeesController.createEmployee(req, res);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "put",
        handler: [check_auth_1.checkJwt,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield employeesController.updateEmployee(req, res);
            })
        ]
    },
    {
        path: "/api/employees/:empID",
        method: "delete",
        handler: [check_auth_1.checkJwt,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield employeesController.deleteEmployee(req, res);
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map