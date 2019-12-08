import mysql from 'mysql';
import dotenv from 'dotenv';
import util from 'util';
import keys from './config/DBkeys';
import { IDBConnection } from './config/IDBconnection';

export class MysqlConnection extends IDBConnection {
  private pool: any

  constructor() {
    super()
    dotenv.config()
    this.pool = mysql.createPool({
      host: keys.database.host,
      user: keys.database.user,
      password: keys.database.password,
      multipleStatements: true
    });

    this.pool.getConnection((err: any, connection: any) => {
      connection.query('SHOW SCHEMA LIKE ' + keys.database.databaseName,
        (err: any, result: any) => {
          if (err) {
            const createDatabase = `CREATE SCHEMA IF NOT EXISTS EmployeeDB`;
            this.pool.query(createDatabase, function (err: any, result: any) {
              if (err) {
                console.log('createDatabase error:\n' + err);
              } else {
                const createUsersTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.users(
                id varchar(150) primary key,
                name varchar(45) not null,
                email varchar(45) not null unique,
                password varchar(225) not null)`;

                connection.query(createUsersTable);

                const insertDataInUsers = `
              INSERT INTO EmployeeDB.users (id, name, email, password) VALUES (
                "48850418-bb67-489d-a391-575bcb110ed5", "Test", "test123@mail.com",
                "$2b$10$FZdC7X9hGPwZ3X9HSLdb/uR14ffheCcYHgadwduQSnydmTUv7pwC2");`;

                connection.query(insertDataInUsers);

                const createDepartmentsTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.departments(
                dpID int(11) NOT NULL Primary Key,
                dpName varchar(45) not null)`;

                connection.query(createDepartmentsTable);

                const insertDataInDepartments = `
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (1, "HR");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (2, "Tech");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (3, "Finance")`;

                connection.query(insertDataInDepartments);

                const createEmployeesTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.employees(
                empID int(11) auto_increment NOT NULL Primary Key,
                empName varchar(45) not null,
                empActive tinyint(1) not null,
                empDepartment int(11) not null,
                creator varchar(45) not null,
                CONSTRAINT fk_empDepartment FOREIGN KEY (empDepartment)
                REFERENCES departments(dpID))`;

                connection.query(createEmployeesTable);

                const insertDataInEmployees = `
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (1, "Lisa", 1, 1, "48850418-bb67-489d-a391-575bcb110ed5");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (2, "Bart", 0, 2, "48850418-bb67-489d-a391-575bcb110ed5");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (3, "Homer", 0, 3, "48850418-bb67-489d-a391-575bcb110ed5");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (4, "Tina", 1, 2, "48850418-bb67-489d-a391-575bcb110ed5")`;

                connection.query(insertDataInEmployees);
              }
            });
          }
        });
      if (err) {
        console.log(err.message);
      } else {
        console.log('Connected to database!');
      }
    });

    this.pool.getConnection((error: any, connection: any) => {
      if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }

      if (connection) connection.release()

      return
    })
    this.pool.query = util.promisify(this.pool.query)
  }

  execute(query: string, params: any = null) {
    if (params !== null) {
      return this.pool.query(query, params)
    } else {
      return this.pool.query(query)
    }
  }
}


