import request from 'supertest';
import app from '../../server';

let token: string;
let employeeId: number;

beforeAll((done) => {
  request(app)
    .post('/api/auth/login')
    .send({
      email: 'qwerty123456@gmail.com',
      password: 'qwerty123456',
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe('Employee endpoints', () => {
  test('Authorization', () => {
    return request(app)
      .post('/api/employees')
      .then((response) => {
        expect(response.status).toBe(401);
      });
  });

  it('Get employees', () => {
    return request(app)
      .get('/api/employees?pagesize=5&&page=0')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('Create new employee', (done) => {
    return request(app)
      .post('/api/employees')
      .send({
        empName: 'Uncle Bob',
        empActive: 1,
        empDepartment: 2
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, response) => {
        expect(response.status).toBe(201);
        employeeId = response.body.employee;
        done();
      });

  });

  it('Update an employee', () => {
    return request(app)
      .put('/api/employees/' + employeeId)
      .send({
        empName: 'Marmok',
        empActive: 1,
        empDepartment: 3
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('Get an employee', () => {
    return request(app)
      .get('/api/employees/' + employeeId)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('Delete an employee', () => {
    return request(app)
      .delete('/api/employees/' + employeeId)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
