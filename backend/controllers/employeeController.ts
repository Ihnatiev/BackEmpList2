import { EmployeesService } from '../services/employeeService';
import { IDBConnection } from '../config/IDBConnection';

export class EmployeesController {
  private employeeService: EmployeesService;

  constructor(dbConnection: IDBConnection) {
    this.employeeService = new EmployeesService(dbConnection);
  }

  async findEmployee(req: any, res: any) {
    const empID = req.params.empID;
    this.employeeService.find(empID)
      .then(employee => {
        if (employee) {
          return res.status(200).json({
            employee: [employee],
            id: employee.empID
          });
        } else {
          return res.status(404).json({
            message: 'Employee not found!'
          });
        }
      })
      .catch(err => {
        res.status(404).json({
          message: 'Server error'
        });
      });
  }

  async findAllEmployees(req: any, res: any) {
    let totalCount: any;
    const numPerPage = +req.query.pagesize;
    const page = +req.query.page;
    const skip = page * numPerPage;
    const end_limit = numPerPage;
    const limit = skip + ',' + end_limit;
    this.employeeService.findCount()
      .then((results: any) => {
        totalCount = results[0].totalCount;
      })
      .then(async () => {
        const results = await this.employeeService.findAll(limit);
        return res.json({
          employees: results,
          maxEmployees: totalCount
        });
      })
      .catch((err: any) => {
        res.status(500).json({
          success: false,
          message: 'Server error'
        });
      });
  }

  async createEmployee(req: any, res: any) {
    const { empName, empActive, empDepartment } = req.body;
    const creator = req.userData.userId;
    try {
      let result = await this.employeeService.create(empName, empActive, empDepartment, creator);
      return res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        employee: result.empID
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Adding employee failed!'
      });
    };
  }

  async updateEmployee(req: any, res: any) {
    const empID = req.params.empID;
    const creator = req.userData.userId;
    const { empName, empActive, empDepartment } = req.body;
    await this.employeeService.update(empID, empName, empActive, empDepartment, creator)
      .then((result: any) => {
        try {
          if (result.affectedRows > 0) {
            return res.status(200).json({
              message: 'Update successful!',
              empName: empName
            });
          } else {
            return res.status(401).json({
              message: 'Not authorized!'
            });
          };
        } catch (error) {
          return res.status(500).json({
            message: 'Updating an employee failed!'
          });
        };
      }).catch(err => {
        res.status(500).json({
          message: 'Server error'
        });
      });
  }

  async deleteEmployee(req: any, res: any) {
    const empID = req.params.empID;
    const creator = req.userData.userId
    await this.employeeService.delete(empID, creator)
      .then((employee: any) => {
        try {
          if (employee.affectedRows > 0) {
            return res.status(200).json({
              message: 'Deletion successful!'
            });
          } else {
            return res.status(401).json({
              message: 'Not authorized!'
            });
          };
        } catch (error) {
          return res.status(500).json({
            message: "You are not authenticated!"
          });
        };
      }).catch(err => {
        res.status(500).json({
          success: false,
          message: 'Server error'
        });
      });
  }
}
