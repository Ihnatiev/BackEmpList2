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
const IEmployee_1 = require("../interfaces/IEmployee");
class EmployeesService extends IEmployee_1.IEmployee {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    find(empID) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = yield this.connection.execute("SELECT empID, empName, IF (empActive, 'Yes', 'No')\
      empActive, dpName FROM Employee NNER JOIN Department\
      ON empDepartment = dpID WHERE empID = ?", empID);
            return queryResult[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResults = yield this.connection.execute("SELECT empID, empName, IF (empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID");
            let results = [];
            results = queryResults.map((m) => {
                return m;
            });
            return results;
        });
    }
    persist(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute("INSERT INTO Employee SET empName = ?, empActive = ?, empDepartment = ?, creator = ?", [
                employee.empName,
                employee.empActive,
                employee.empDepartment,
                employee.creator
            ]);
            employee.empID = result.insertId;
            return employee;
        });
    }
    merge(employee, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute("UPDATE Employee SET empName = ?, empActive = ?, empDepartment = ? WHERE empID = ? AND creator = ?", [
                employee.empName,
                employee.empActive,
                employee.empDepartment,
                employee.empID,
                creator
            ]);
            // console.log(employee.empID);
            return result;
        });
    }
    delete(employee, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute("DELETE FROM Employee WHERE empID = ? AND creator = ?", [employee.empID, creator]);
            return result;
        });
    }
}
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employeeService.js.map