import { Employee } from '../models/employeeModel'

const _serializeSingleEmployee = (employee: Employee) => {
  return {
    empID: employee.empID,
    empName: employee.empName,
    empActive: employee.empActive,
    empDepartment: employee.empDepartment
  }
}

export class EmployeeSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error('Expect data to be not undefined or null')
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleEmployee)
    }
    return _serializeSingleEmployee(data)
  }
}

