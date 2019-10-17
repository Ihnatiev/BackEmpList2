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
const employeeService_1 = require("../services/employeeService");
const employee_1 = require("../usecases/employee");
class EmployeesController {
    constructor(dbConnection) {
        this.employeeService = new employeeService_1.EmployeesService(dbConnection);
        this.connection = dbConnection;
    }
    findEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const useCase = new employee_1.GetEmployee(this.employeeService);
            yield useCase.execute(empID)
                .then(employee => {
                return res.status(200).json({
                    employee: [employee]
                });
            })
                .catch(err => {
                res.status(404).json({
                    success: false,
                    message: 'Employee not found!\n' + err.message
                });
            });
        });
    }
    findAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalCount;
            const numPerPage = +req.query.pagesize;
            const page = +req.query.page;
            const skip = page * numPerPage;
            const end_limit = numPerPage;
            const limit = skip + ',' + end_limit;
            yield this.connection.execute('SELECT count(*) as totalCount FROM Employee')
                .then((results) => {
                totalCount = results[0].totalCount;
            })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                let results = yield this.connection.execute("SELECT empID, empName, creator, IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit);
                return res.json({
                    employees: results,
                    maxEmployees: totalCount
                });
            }))
                .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error\n' + err.message
                });
            });
        });
    }
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { empName, empActive, empDepartment } = req.body;
            const creator = req.userData.userId;
            const useCase = new employee_1.CreateEmployee(this.employeeService);
            try {
                let result = yield useCase.execute(empName, empActive, empDepartment, creator);
                return res.status(201).json({
                    success: true,
                    message: 'Employee added successfully!',
                    employee: result.empID
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Adding employee failed!\n' + err.message
                });
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const creator = req.userData.userId;
            const { empName, empActive, empDepartment } = req.body;
            const useCase = new employee_1.UpdateEmployee(this.employeeService);
            try {
                yield useCase.execute(empID, empName, empActive, empDepartment, creator)
                    .then((result) => {
                    try {
                        if (result.affectedRows > 0) {
                            res.status(200).json({
                                message: 'Update successful!'
                            });
                        }
                        else {
                            res.status(401).json({
                                message: 'Not authorized!'
                            });
                        }
                        ;
                    }
                    catch (error) {
                        res.status(500).json({
                            message: 'Updating an employee failed!'
                        });
                    }
                    ;
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Please fill in the blank fields'
                });
            }
        });
    }
    ;
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const creator = req.userData.userId;
            const useCase = new employee_1.DeleteEmployee(this.employeeService);
            yield useCase.execute(empID, creator)
                .then((employee) => {
                try {
                    if (employee.affectedRows > 0) {
                        res.status(200).json({
                            message: 'Deletion successful!'
                        });
                    }
                    else {
                        res.status(401).json({
                            message: 'Not authorized!'
                        });
                    }
                    ;
                }
                catch (error) {
                    res.status(500).json({
                        message: "You are not authenticated!"
                    });
                }
                ;
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
        });
    }
    ;
}
exports.EmployeesController = EmployeesController;
;
//# sourceMappingURL=employeeController.js.map