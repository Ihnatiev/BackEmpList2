import { Employee } from '../models/employeeModel';
import { IDBConnection } from '../config/IDBConnection';

export class EmployeesService {
  private connection: any;

  constructor(connection: IDBConnection) {
    this.connection = connection;
  }

  async find(empID: number): Promise<Employee> {
    let queryResult = await this.connection.execute(
      "SELECT empID, empName, IF (empActive, 'Yes', 'No')\
      empActive, dpName FROM Employee NNER JOIN Department\
      ON empDepartment = dpID WHERE empID = ?", empID);
    return queryResult[0];
  }

  async findCount(): Promise<Array<Employee>> {
    const results = await this.connection.execute('SELECT count(*) as totalCount FROM Employee');
    return results;
  }

  async findAll(limit: string): Promise<Array<Employee>> {
    let queryResults = await this.connection.execute(
      "SELECT empID, empName, creator, IF (empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit)
    let results = [];
    results = queryResults.map((m: any) => {
      return m;
    });
    return results;
  }

  async create(empName: string, empActive: boolean, empDepartment: number, creator: string): Promise<Employee> {
    let employee = new Employee();
    employee.empName = empName;
    employee.empActive = empActive;
    employee.empDepartment = empDepartment;
    employee.creator = creator;
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

  async update(empID: number, empName: string, empActive: boolean, empDepartment: number, creator: string): Promise<Employee> {
    let employee = await this.find(empID);
    employee.empName = empName;
    employee.empActive = empActive;
    employee.empDepartment = empDepartment;
    employee.creator = creator;
    let result = await this.connection.execute(
      "UPDATE Employee SET empName = ?, empActive = ?, empDepartment = ? WHERE empID = ? AND creator = ?",
      [
        employee.empName,
        employee.empActive,
        employee.empDepartment,
        employee.empID,
        creator
      ]);
    return result;
  }

  async delete(empID: number, creator: string): Promise<Employee> {
    let employee = await this.find(empID);
    let result = await this.connection.execute(
      "DELETE FROM Employee WHERE empID = ? AND creator = ?",
      [employee.empID, creator]);
    return result;
  }
}
