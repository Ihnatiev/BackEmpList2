import { User } from '../models/userModel';

export abstract class IUser {
  abstract async signup(user: User): Promise<User>;
  abstract async find(email: string): Promise<User>;
};

