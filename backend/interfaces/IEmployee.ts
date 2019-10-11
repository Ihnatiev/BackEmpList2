import { Employee } from '../models/employeeModel';

export abstract class IEmployeeRepository {
    abstract async findAll(): Promise<Array<Employee>>
    abstract async find(empID: number): Promise<Employee>
    abstract async persist(employee: Employee): Promise<Employee>
    abstract async merge(employee: Employee): Promise<Employee>
    abstract async delete(employee: Employee): Promise<Employee>
}

