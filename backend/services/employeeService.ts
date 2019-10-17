import { Employee } from '../models/employeeModel';
import { IEmployee } from '../interfaces/IEmployee';
import { IDBConnection } from '../config/IDBConnection';

export class EmployeesService extends IEmployee {
  private connection: any;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection;
  }

  async find(empID: number): Promise<Employee> {
    let queryResult = await this.connection.execute(
      "SELECT empID, empName, IF (empActive, 'Yes', 'No')\
      empActive, dpName FROM Employee NNER JOIN Department\
      ON empDepartment = dpID WHERE empID = ?", empID);
    return queryResult[0];
  }

  async findAll(): Promise<Array<Employee>> {
    let queryResults = await this.connection.execute(
      "SELECT empID, empName, IF (empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID")
    let results = [];
    results = queryResults.map((m: any) => {
      return m;
    });
    return results;
  }

  async persist(employee: Employee): Promise<Employee> {
    let result = await this.connection.execute(
      "INSERT INTO Employee SET empName = ?, empActive = ?, empDepartment = ?, creator = ?",
      [
        employee.empName,
        employee.empActive,
        employee.empDepartment,
        employee.creator
      ]);
    employee.empID = result.insertId;
    return employee;
  }

  async merge(employee: Employee, creator: string): Promise<Employee> {
    let result = await this.connection.execute(
      "UPDATE Employee SET empName = ?, empActive = ?, empDepartment = ? WHERE empID = ? AND creator = ?",
      [
        employee.empName,
        employee.empActive,
        employee.empDepartment,
        employee.empID,
        creator
      ]);
    // console.log(employee.empID);
    return result;
  }

  async delete(employee: Employee, creator: string): Promise<Employee> {
    let result = await this.connection.execute(
      "DELETE FROM Employee WHERE empID = ? AND creator = ?",
      [employee.empID, creator]);
    return result;
  }
}
