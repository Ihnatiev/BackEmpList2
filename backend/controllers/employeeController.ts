import { EmployeesService } from '../services/employeeService'
import { IDBConnection } from '../config/IDBConnection'
import {
  GetEmployee,
  CreateEmployee,
  UpdateEmployee,
  DeleteEmployee
} from '../usecases/employee'

export class EmployeesController {
  private connection: any
  private employeeService: EmployeesService

  constructor(dbConnection: IDBConnection) {
    this.employeeService = new EmployeesService(dbConnection)
    this.connection = dbConnection
  }

  async findEmployee(req: any, res: any) {
    const empID = req.params.empID;
    const useCase = new GetEmployee(this.employeeService)
    await useCase.execute(empID)
      .then(employee => {
        return res.status(200).json({
          employee: [employee]
        });
      })
      .catch(err => {
        res.status(404).json({
          success: false,
          message: 'Employee not found!\n' + err.message
        })
      })
  }

  async findAllEmployees(req: any, res: any) {
    let totalCount: any;
    const numPerPage = +req.query.pagesize;
    const page = +req.query.page;
    const skip = page * numPerPage;
    const end_limit = numPerPage;
    const limit = skip + ',' + end_limit;
    await this.connection.execute('SELECT count(*) as totalCount FROM Employee')
      .then((results: any) => {
        totalCount = results[0].totalCount;
      })
      .then(async () => {
        let results = await this.connection.execute("SELECT empID, empName, creator, IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit);
        return res.json({
          employees: results,
          maxEmployees: totalCount
        })
      })
      .catch((err: any) => {
        res.status(500).json({
          success: false,
          message: 'Server error\n' + err.message
        });
      });
  }

  async createEmployee(req: any, res: any) {
    const { empName, empActive, empDepartment } = req.body
    const creator = req.userData.userId
    const useCase = new CreateEmployee(this.employeeService)
    try {
      let result = await useCase.execute(empName, empActive, empDepartment, creator)
      return res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        employee: result.empID
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Adding employee failed!\n' + err.message
      })
    }
  }

  async updateEmployee(req: any, res: any) {
    const empID = req.params.empID;
    const creator = req.userData.userId;
    const { empName, empActive, empDepartment } = req.body;
    const useCase = new UpdateEmployee(this.employeeService);
    try {
      await useCase.execute(empID, empName, empActive, empDepartment, creator)
        .then((result: any) => {
          try {
            if (result.affectedRows > 0) {
              res.status(200).json({
                message: 'Update successful!'
              });
            } else {
              res.status(401).json({
                message: 'Not authorized!'
              });
            };
          } catch (error) {
            res.status(500).json({
              message: 'Updating an employee failed!'
            });
          };
        });
    } catch (err) {
      res.status(500).json({
        message: 'Please fill in the blank fields'
      });
    }
  };

  async deleteEmployee(req: any, res: any) {
    const empID = req.params.empID;
    const creator = req.userData.userId;
    const useCase = new DeleteEmployee(this.employeeService);
    await useCase.execute(empID, creator)
      .then((employee: any) => {
        try {
          if (employee.affectedRows > 0) {
            res.status(200).json({
              message: 'Deletion successful!'
            });
          } else {
            res.status(401).json({
              message: 'Not authorized!'
            });
          };
        } catch (error) {
          res.status(500).json({
            message: "You are not authenticated!"
          });
        };
      }).catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });
  };
};
