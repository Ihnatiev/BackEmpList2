import { Request, Response } from 'express';
import { checkUserCreate } from '../middleware/checks';
import { EmployeesController } from '../controllers/employeeController';
import { UserController } from '../controllers/UserController';
import { checkJwt } from '../middleware/check-auth';
import { MysqlConnection } from '../app';

const mysqlConnection = new MysqlConnection();
const employeesController = new EmployeesController(mysqlConnection);
const userController = new UserController(mysqlConnection);

export default [
  // {
  //   path: "/api/auth/signup",
  //   method: "post",
  //   handler: [checkUserCreate,
  //     (req: Request, res: Response) => {
  //       userController.createUser(req, res);
  //     }
  //   ]
  // },
  {
    path: "/api/auth/login",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        await userController.loginUser(req, res);
      }
    ]
  },
  {
    path: "/api/employees",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        await employeesController.findAllEmployees(req, res);
        
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        await employeesController.findEmployee(req, res);
      }
    ]
  },
  {
    path: "/api/employees/",
    method: "post",
    handler: [checkJwt,
      async (req: Request, res: Response) => {
        await employeesController.createEmployee(req, res);
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "put",
    handler: [checkJwt,
      async (req: Request, res: Response) => {
        await employeesController.updateEmployee(req, res);
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "delete",
    handler: [checkJwt,
      async (req: Request, res: Response) => {
        await employeesController.deleteEmployee(req, res);
      }
    ]
  }
]

