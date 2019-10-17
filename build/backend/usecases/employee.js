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
    constructor(employeeInterface) {
        this.employeeInterface = employeeInterface;
    }
    execute(empID) {
        return this.employeeInterface.find(empID);
    }
}
exports.GetEmployee = GetEmployee;
class ListEmployees {
    constructor(employeeInterface) {
        this.employeeInterface = employeeInterface;
    }
    execute() {
        return this.employeeInterface.findAll();
    }
}
exports.ListEmployees = ListEmployees;
class CreateEmployee {
    constructor(employeeInterface) {
        this.employeeInterface = employeeInterface;
    }
    execute(empName, empActive, empDepartment, creator) {
        let employee = new employeeModel_1.Employee();
        employee.empName = empName;
        employee.empActive = empActive;
        employee.empDepartment = empDepartment;
        employee.creator = creator;
        return this.employeeInterface.persist(employee);
    }
}
exports.CreateEmployee = CreateEmployee;
class UpdateEmployee {
    constructor(employeeInterface) {
        this.employeeInterface = employeeInterface;
    }
    execute(empID, empName, empActive, empDepartment, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeInterface.find(empID);
            employee.empName = empName;
            employee.empActive = empActive;
            employee.empDepartment = empDepartment;
            employee.creator = creator;
            return this.employeeInterface.merge(employee, creator);
        });
    }
}
exports.UpdateEmployee = UpdateEmployee;
class DeleteEmployee {
    constructor(employeeInterface) {
        this.employeeInterface = employeeInterface;
    }
    execute(empID, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeInterface.find(empID);
            return this.employeeInterface.delete(employee, creator);
        });
    }
}
exports.DeleteEmployee = DeleteEmployee;
//# sourceMappingURL=employee.js.map