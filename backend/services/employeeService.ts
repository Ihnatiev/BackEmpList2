import { Employee } from '../models/employeeModel'
import { IEmployeeRepository } from '../interfaces/IEmployee'
import { IDBConnection } from '../config/IDBConnection'

export class EmployeesService extends IEmployeeRepository {
  private connection: any

  constructor(connection: IDBConnection) {
    super()
    this.connection = connection
  }

  private convertModel(r: any) {
    let employee = new Employee()

    employee.empID = r.empID
    employee.empName = r.empName
    employee.empActive = r.empActive
    employee.empDepartment = r.dpName

    return employee
  }

  async find(empID: number): Promise<Employee> {
    let queryResults = await this.connection.execute(
      "SELECT empID, empName, IF (empActive, 'Yes', 'No')\
      empActive, dpName FROM Employee NNER JOIN Department\
      ON empDepartment = dpID WHERE empID = ?", empID
    )
    return this.convertModel(queryResults[0])
  }

  async findAll(): Promise<Array<Employee>> {
    await this.connection.execute("SELECT count(*) as TotalCount FROM Employee")
    let queryResults = await this.connection.execute(
    "SELECT empID, empName, IF (empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID")
    let results = []
    results = queryResults.map((m: any) => {
      return this.convertModel(m)
    })
    return results
  }

  async persist(employee: Employee): Promise<Employee> {
    let result = await this.connection.execute(
      'INSERT INTO Employee SET empName = ?, empActive = ?, empDepartment = ?',
      [
        employee.empName,
        employee.empActive,
        employee.empDepartment
      ])
    employee.empID = result.employeeId
    return employee
  }

  async merge(employee: Employee): Promise<Employee> {
    let result = await this.connection.execute(
      "UPDATE Employee SET empName = ?, empActive = ?,\
      empDepartment = ? WHERE empID = ?",
      [
        employee.empName,
        employee.empActive,
        employee.empDepartment,
        employee.empID
      ])
    return result
  }

  async delete(employee: Employee): Promise<Employee> {
    await this.connection.execute(
      "DELETE FROM Employee WHERE empID = ?",
      employee.empID
    )
    return this.convertModel(employee)
  }
}
