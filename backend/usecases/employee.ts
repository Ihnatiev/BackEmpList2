import { IEmployee } from '../interfaces/IEmployee';
import { Employee } from '../models/employeeModel';

export class GetEmployee {
  private employeeInterface: IEmployee;

  constructor(employeeInterface: IEmployee) {
    this.employeeInterface = employeeInterface;
  }

  execute(empID: number) {
    return this.employeeInterface.find(empID);
  }
}

export class ListEmployees {
  private employeeInterface: IEmployee;

  constructor(employeeInterface: IEmployee) {
    this.employeeInterface = employeeInterface;
  }

  execute() {
    return this.employeeInterface.findAll();
  }
}

export class CreateEmployee {
  private employeeInterface: IEmployee;

  constructor(employeeInterface: IEmployee) {
    this.employeeInterface = employeeInterface;
  }

  execute(empName: string, empActive: boolean, empDepartment: number, creator: string) {
    let employee = new Employee();
    employee.empName = empName;
    employee.empActive = empActive;
    employee.empDepartment = empDepartment;
    employee.creator = creator;
    return this.employeeInterface.persist(employee);
  }
}

export class UpdateEmployee {
  private employeeInterface: IEmployee;

  constructor(employeeInterface: IEmployee) {
    this.employeeInterface = employeeInterface;
  }

  async execute(empID: number, empName: string, empActive: boolean, empDepartment: number, creator: string) {
    let employee = await this.employeeInterface.find(empID);
    employee.empName = empName;
    employee.empActive = empActive;
    employee.empDepartment = empDepartment;
    employee.creator = creator;
    return this.employeeInterface.merge(employee, creator);
  }
}

export class DeleteEmployee {
  private employeeInterface: IEmployee;

  constructor(employeeInterface: IEmployee) {
    this.employeeInterface = employeeInterface;
  }

  async execute(empID: number, creator: string) {
    let employee = await this.employeeInterface.find(empID);
    return this.employeeInterface.delete(employee, creator);
  }
}

