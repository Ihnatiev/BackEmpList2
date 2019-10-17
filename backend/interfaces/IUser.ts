import { User } from '../models/user';

export abstract class IUser {
  abstract async signup(user: User): Promise<User>;
  abstract async find(email: string): Promise<User>;
};

