/*import { Employees } from './employees';
import { Http } from './http';
jest.mock('./http');

describe('Employees', () => {
  let instance: Employees;

  beforeEach(() => {
    instance = new Employees();
  });

  it('should get all employees as an array', async () => {
    expect(instance).toBeInstanceOf(Employees);
    const allEmployees = await instance.findAll();
    expect(allEmployees).toBeDefined();
    expect(allEmployees[0]).toBeDefined();
  });

  it('should get receive an error', async () => {
    Http.prototype.get = jest.fn().mockImplementationOnce(() => {
      return new Error('Something weird happened');
    });
    const error: Error = await instance.findAll();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Something weird happened')
  });
});*/

jest.mock('../../../services/employeeService');
//jest.mock('../../../config/IDBConnection');
import { EmployeesController } from '../../../controllers/employeeController';
import { EmployeesService } from '../../../services/employeeService';
import mock from '../../../utils/interceptor';

describe('Employees', () => {

  test('should get count of employees', async () => {
    const mockRequest = (query: any) => ({ query });
    const req = mockRequest({
      pagesize: 1,
      page: 0
    });
    const res = mock.Response();

    const expectedEmployee = [{
      empID: 295,
      empName: "Max",
      creator: "48850418-bb67-489d-a391-575bcb110ed5",
      empActive: "Yes",
      dpName: "Finance"
    }];

    // const getCount = jest.spyOn(EmployeesService.prototype, "findCount");

    const findCount = jest.spyOn(EmployeesService.prototype, "findCount")
      .mockImplementation(() => Promise.resolve([{"totalCount": 2}]));
      //.mockImplementation(() => Promise.resolve());
    const findAll = jest.spyOn(EmployeesService.prototype, "findAll")
      .mockResolvedValueOnce(() => Promise.resolve(
        [{
          empID: 295,
          empName: "Max",
          creator: "48850418-bb67-489d-a391-575bcb110ed5",
          empActive: "Yes",
          dpName: "Finance"
        }]
      ));
    await EmployeesController.prototype.findAllEmployees(req, res);
    expect(findCount).toHaveBeenCalledTimes(1);
    expect(findAll).toHaveBeenCalledTimes(1);
    //expect(spyFind).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: true,
    //   employee: expectedEmployee
    // });
  });

  // it('should get receive an error', async () => {
  //   Http.prototype.get = jest.fn().mockImplementationOnce(() => {
  //     return new Error('Something weird happened');
  //   });
  //   const error: Error = await instance.findAll();
  //   expect(error).toBeInstanceOf(Error);
  //   expect(error.message).toBe('Something weird happened')
  // });
});


/*
jest.mock('../../../services/employeeService');
import { EmployeesController } from '../../../controllers/employeeController';
import { EmployeesService } from '../../../services/employeeService';
import mock from '../../../utils/interceptor';


describe("EmployeeController", () => {
  describe("Requests by /employees/:employeeId", () => {
    describe("Get request / response test", () => {
      test("should get an employee", () => {
        const mockRequest = (params: any) => ({
          params,
        });
        const req = mockRequest({
          empID: 262
        });
        const res = mock.Response();

        const spyFind = jest.spyOn(EmployeesService.prototype, "find")
        .mockImplementation(
        //   () => {
        //   return ([
        //     {
        //       empID: 262,
        //       empName: "Nik",
        //       creator: "18664399",
        //       empActive: "No",
        //       dpName: "Finance"
        //     }
        //   ]);
        // }
        );

        const expectedEmployee = [{
          empID: 262,
          empName: "Nik",
          creator: "18664399",
          empActive: "No",
          dpName: "Finance"
        }];

        EmployeesController.prototype.findEmployee(req, res);
        expect(spyFind).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          employee: expectedEmployee
        });
        spyFind.mockClear();
      });
    });
  });
});
*/
