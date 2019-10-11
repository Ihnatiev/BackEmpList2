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
const IEmployee_1 = require("../interfaces/IEmployee");
class EmployeesService extends IEmployee_1.IEmployeeRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    convertModel(r) {
        let employee = new employeeModel_1.Employee();
        employee.empID = r.empID;
        employee.empName = r.empName;
        employee.empActive = r.empActive;
        employee.empDepartment = r.dpName;
        return employee;
    }
    find(empID) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResults = yield this.connection.execute("SELECT empID, empName, IF (empActive, 'Yes', 'No')\
      empActive, dpName FROM Employee NNER JOIN Department\
      ON empDepartment = dpID WHERE empID = ?", empID);
            return this.convertModel(queryResults[0]);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute("SELECT count(*) as TotalCount FROM Employee");
            let queryResults = yield this.connection.execute("SELECT empID, empName, IF (empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID");
            let results = [];
            results = queryResults.map((m) => {
                return this.convertModel(m);
            });
            return results;
        });
    }
    persist(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute('INSERT INTO Employee SET empName = ?, empActive = ?, empDepartment = ?', [
                employee.empName,
                employee.empActive,
                employee.empDepartment
            ]);
            employee.empID = result.employeeId;
            return employee;
        });
    }
    merge(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection.execute("UPDATE Employee SET empName = ?, empActive = ?,\
      empDepartment = ? WHERE empID = ?", [
                employee.empName,
                employee.empActive,
                employee.empDepartment,
                employee.empID
            ]);
            return result;
        });
    }
    delete(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute("DELETE FROM Employee WHERE empID = ?", employee.empID);
            return this.convertModel(employee);
        });
    }
}
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employeeService.js.map