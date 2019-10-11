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
const employeeModel_1 = require("../models/employeeModel");
class GetEmployee {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(empID) {
        return this.employeeRepository.find(empID);
    }
}
exports.GetEmployee = GetEmployee;
class ListEmployees {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute() {
        return this.employeeRepository.findAll();
    }
}
exports.ListEmployees = ListEmployees;
class CreateEmployee {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(empName, empActive, empDepartment) {
        let employee = new employeeModel_1.Employee();
        employee.empName = empName;
        employee.empActive = empActive;
        employee.empDepartment = empDepartment;
        return this.employeeRepository.persist(employee);
    }
}
exports.CreateEmployee = CreateEmployee;
class UpdateEmployee {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(empID, empName, empActive, empDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.find(empID);
            employee.empName = empName;
            employee.empActive = empActive;
            employee.empDepartment = empDepartment;
            return this.employeeRepository.merge(employee);
        });
    }
}
exports.UpdateEmployee = UpdateEmployee;
class DeleteEmployee {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(empID) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.find(empID);
            return this.employeeRepository.delete(employee);
        });
    }
}
exports.DeleteEmployee = DeleteEmployee;
//# sourceMappingURL=employee.js.map