import { IUser } from '../interfaces/IUser';
import { User } from '../models/userModel';

export class CreateUser {
  private userRepository: IUser;

  constructor(userRepository: IUser) {
    this.userRepository = userRepository;
  }

  execute(name: string, email: string, password: string) {
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return this.userRepository.signup(user);
  };
}

