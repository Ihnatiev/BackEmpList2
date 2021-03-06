import { UserService } from '../services/userService';
import { IDBConnection } from '../config/IDBConnection';
import secret from '../config/secret';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserController {
  private userService: UserService;

  constructor(dbConnection: IDBConnection) {
    this.userService = new UserService(dbConnection);
  }

  createUser (req: any, res: any) {
    //console.log(req.swagger);
    const { name, email, password } = req.body;
    try {
      this.userService.signup(name, email, password)
        .then(user => {
          return res.status(201).json({
            success: true,
            message: 'User created!',
            userId: user.id
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: 'This email already exists!'
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Invalid authentication credentials!'
      });
    };
  };

  async loginUser(req: any, res: any) {
    let fetchedUser: any;
    const hash = req.body.password;
    this.userService.login(req.body.email)
      .then(user => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: 'Auth failed! Check your email and password.'
          });
        };
        fetchedUser = user;
        return bcrypt.compare(req.body.password, hash);
      })
      .then(err => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Auth failed'
          });
        };
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser.id },
          secret.jwtSecret,
          { expiresIn: '1h' }
        );
        return res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser.id,
          userName: fetchedUser.name
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: 'Invalid authentication credentials!'
        });
      });
  }
}


