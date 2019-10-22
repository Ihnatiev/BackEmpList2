import request from 'supertest';
import app from '../../server';
import secret from '../config/secret';

let token: string;
let employeeId: number;

describe('User signUp', () => {
  it('Create new user', (done) => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Bob',
        email: 'bobby@test.com',
        password: 'bobby-cool123'
      })
      .end((err, response) => {
        expect(response.status).toBe(201);
        done();
        expect(response.body.userName).toBe('Bob');
      });
  })
})

beforeAll((done) => {
  request(app)
    .post('/api/auth/login')
    .send(secret.payload)
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
        empActive: 0,
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
        expect(response.body.empName).toBe('Marmok');
        expect(response.body.empActive).toEqual(1);
        expect(response.body.empDepartment).toEqual(3);
      });
  });

  it('Get an employee', () => {
    return request(app)
      .get('/api/employees/' + employeeId)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(employeeId);
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
