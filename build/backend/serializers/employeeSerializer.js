"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _serializeSingleEmployee = (employee) => {
    return {
        empID: employee.empID,
        empName: employee.empName,
        empActive: employee.empActive,
        empDepartment: employee.empDepartment
    };
};
class EmployeeSerializer {
    serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined or null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleEmployee);
        }
        return _serializeSingleEmployee(data);
    }
}
exports.EmployeeSerializer = EmployeeSerializer;
//# sourceMappingURL=employeeSerializer.js.map