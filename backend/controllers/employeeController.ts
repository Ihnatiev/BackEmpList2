import { EmployeeSerializer } from '../serializers/employeeSerializer'
import { EmployeesService } from '../services/employeeService'
import { IDBConnection } from '../config/IDBConnection'
import {
  GetEmployee,
  ListEmployees,
  CreateEmployee,
  UpdateEmployee,
  DeleteEmployee
} from '../usecases/employee'

export class EmployeesController {
  private employeeSerializer: EmployeeSerializer
  private employeeService: EmployeesService

  constructor(dbConnection: IDBConnection) {
    this.employeeSerializer = new EmployeeSerializer()
    this.employeeService = new EmployeesService(dbConnection)
  }

  async findEmployee(req: any, res: any) {
    const empID = req.params.empID
    const useCase = new GetEmployee(this.employeeService)
    try {
      let result = await useCase.execute(empID)
      return this.employeeSerializer.serialize(result)
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Employee not found!'
      })
    }
  }

  async findAllEmployees(req: any, res: any) {
    const useCase = new ListEmployees(this.employeeService)
    try {
      let results = await useCase.execute()
      return this.employeeSerializer.serialize(results)
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  }

  async createEmployee(req: any, res: any) {
    const { empName, empActive, empDepartment } = req.body
    const useCase = new CreateEmployee(this.employeeService)
    try {
      let result = await useCase.execute(empName, empActive, empDepartment)
      return res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        result: this.employeeSerializer.serialize(result)
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Adding employee failed!'
      })
    }
  }

  async updateEmployee(req: any, res: any) {
    const empID = req.params.empID
    const { empName, empActive, empDepartment } = req.body
    const useCase = new UpdateEmployee(this.employeeService)
    try {
      let result = await useCase.execute(empID, empName, empActive, empDepartment)
      return res.status(200).json({
        data: this.employeeSerializer.serialize(result),
        success: true,
        message: 'Update successful!'
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Employee not found!'
      })
    }
  }

  async deleteEmployee(req: any, res: any) {
    const empID = req.params.empID
    const useCase = new DeleteEmployee(this.employeeService)
    try {
      let result = await useCase.execute(empID)
      return res.status(200).json({
        data: this.employeeSerializer.serialize(result),
        success: true,
        message: 'Deletion successful!'
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Deleting employee failed!'
      })
    }
  }
}

