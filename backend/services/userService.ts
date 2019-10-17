import { User } from '../models/userModel';
import { IUser } from '../interfaces/IUser';
import { IDBConnection } from '../config/IDBConnection';

export class UserService extends IUser {
  private connection: any;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection;
  };

  async signup(user: User): Promise<User> {
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

  async find(email: string): Promise<User> {
    let queryResults = await this.connection.execute(
      'SELECT * FROM Users WHERE email = ?', [email]);
    return queryResults[0];
  }
}

