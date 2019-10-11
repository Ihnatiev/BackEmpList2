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
const employeeSerializer_1 = require("../serializers/employeeSerializer");
const employeeService_1 = require("../services/employeeService");
const employee_1 = require("../usecases/employee");
class EmployeesController {
    constructor(dbConnection) {
        this.employeeSerializer = new employeeSerializer_1.EmployeeSerializer();
        this.employeeService = new employeeService_1.EmployeesService(dbConnection);
    }
    findEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const useCase = new employee_1.GetEmployee(this.employeeService);
            try {
                let result = yield useCase.execute(empID);
                return this.employeeSerializer.serialize(result);
            }
            catch (err) {
                res.status(404).json({
                    success: false,
                    message: 'Employee not found!'
                });
            }
        });
    }
    findAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new employee_1.ListEmployees(this.employeeService);
            try {
                let results = yield useCase.execute();
                return this.employeeSerializer.serialize(results);
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Server error'
                });
            }
        });
    }
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { empName, empActive, empDepartment } = req.body;
            const useCase = new employee_1.CreateEmployee(this.employeeService);
            try {
                let result = yield useCase.execute(empName, empActive, empDepartment);
                return res.status(201).json({
                    success: true,
                    message: 'Employee added successfully!',
                    result: this.employeeSerializer.serialize(result)
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Adding employee failed!'
                });
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const { empName, empActive, empDepartment } = req.body;
            const useCase = new employee_1.UpdateEmployee(this.employeeService);
            try {
                let result = yield useCase.execute(empID, empName, empActive, empDepartment);
                return res.status(200).json({
                    data: this.employeeSerializer.serialize(result),
                    success: true,
                    message: 'Update successful!'
                });
            }
            catch (err) {
                res.status(404).json({
                    success: false,
                    message: 'Employee not found!'
                });
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empID = req.params.empID;
            const useCase = new employee_1.DeleteEmployee(this.employeeService);
            try {
                let result = yield useCase.execute(empID);
                return res.status(200).json({
                    data: this.employeeSerializer.serialize(result),
                    success: true,
                    message: 'Deletion successful!'
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Deleting employee failed!'
                });
            }
        });
    }
}
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employeeController.js.map