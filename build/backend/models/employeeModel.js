"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(empID = 0, empName = "", empActive = false, empDepartment = 0) {
        this._empID = empID;
        this._empName = empName;
        this._empActive = empActive;
        this._empDepartment = empDepartment;
    }
    get empID() {
        return this._empID;
    }
    set empID(empID) {
        this._empID = empID;
    }
    get empName() {
        return this._empName;
    }
    set empName(empName) {
        this._empName = empName;
    }
    get empActive() {
        return this._empActive;
    }
    set empActive(empActive) {
        this._empActive = empActive;
    }
    get empDepartment() {
        return this._empDepartment;
    }
    set empDepartment(empDepartment) {
        this._empDepartment = empDepartment;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employeeModel.js.map