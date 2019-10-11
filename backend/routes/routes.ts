import { Request, Response } from "express";
import { findUsers, userCreate, userLogin } from "../controllers/userController";
import { getPlacesByName } from "../controllers/SearchController";
import { checkSearchParams, checkUserCreate } from "../middleware/checks";
import { EmployeesController } from '../controllers/employeeController'
import { MysqlConnection } from '../app'

const mysqlConnection = new MysqlConnection()
const employeesController = new EmployeesController(mysqlConnection)

export default [
  {
    path: "/api/users",
    method: "get",
    handler: [findUsers]
  },
  {
    path: "/api/auth/signup",
    method: "post",
    handler: [checkUserCreate, userCreate]
  },
  {
    path: "/api/auth/login",
    method: "post",
    handler: [userLogin]
  },
  {
    path: "/api/employees",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        let results = await employeesController.findAllEmployees(req, res)
        res.send(results)
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        let result = await employeesController.findEmployee(req, res)
        res.send(result)
      }
    ]
  },
  {
    path: "/api/employees/",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        let result = await employeesController.createEmployee(req, res)
        res.send(result)
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        let result = await employeesController.updateEmployee(req, res)
        res.send(result)
      }
    ]
  },
  {
    path: "/api/employees/:empID",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        let result = await employeesController.deleteEmployee(req, res)
        res.send(result)
      }
    ]
  },
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q);
        res.status(200).send(result);
      }
    ]
  }
]

