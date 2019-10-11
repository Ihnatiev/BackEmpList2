import { IEmployeeRepository } from '../interfaces/IEmployee'
import { Employee } from '../models/employeeModel'

export class GetEmployee {
  private employeeRepository: IEmployeeRepository

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository
  }

  execute(empID: number) {
    return this.employeeRepository.find(empID)
  }
}

export class ListEmployees {
  private employeeRepository: IEmployeeRepository

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository
  }

  execute() {
    return this.employeeRepository.findAll()
  }
}

export class CreateEmployee {
  private employeeRepository: IEmployeeRepository

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository
  }

  execute(empName: string, empActive: boolean, empDepartment: number) {
    let employee = new Employee()
    employee.empName = empName
    employee.empActive = empActive
    employee.empDepartment = empDepartment
    return this.employeeRepository.persist(employee)
  }
}

export class UpdateEmployee {
  private employeeRepository: IEmployeeRepository

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async execute(empID: number, empName: string, empActive: boolean, empDepartment: number) {
    let employee = await this.employeeRepository.find(empID)
    employee.empName = empName
    employee.empActive = empActive
    employee.empDepartment = empDepartment
    return this.employeeRepository.merge(employee)
  }
}

export class DeleteEmployee {
  private employeeRepository: IEmployeeRepository

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async execute(empID: number) {
    let employee = await this.employeeRepository.find(empID)
    return this.employeeRepository.delete(employee)
  }
}

