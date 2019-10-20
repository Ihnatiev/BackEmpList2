import { User } from '../models/userModel';
import { IDBConnection } from '../config/IDBConnection';

export class UserService {
  private connection: any;

  constructor(connection: IDBConnection) {
    this.connection = connection;
  };

  async signup(name: string, email: string, password: string): Promise<User> {
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    let result = await this.connection.execute(
      'INSERT INTO Users SET name = ?, email = ?, password = ?',
      [
        user.name,
        user.email,
        user.password
      ]);
    user.id = result.insertId;
    return user;
  }

  async login(email: string): Promise<User> {
    let queryResults = await this.connection.execute(
      'SELECT * FROM Users WHERE email = ?', [email]);
    return queryResults[0];
  }
}

