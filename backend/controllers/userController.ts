import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from "../config/secret";
import User from "../models/userModel";

export const findUsers = async (req: Request, res: Response) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const userCreate = async (req: Request, res: Response) => {
  try {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user
          .save()
          .then(result => {
            const token = jwt.sign(
              { email: req.body.email, userId: user._id },
              secret.jwtSecret,
              { expiresIn: '1h' }
            );
            return res.status(201).json({
              success: true,
              message: 'User created!',
              userId: user._id,
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: 'This email already exists!'
            });
          });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Invalid authentication credentials!'
    });
  };
};

export const userLogin = async (req: Request, res: Response) => {
  let fetchedUser: any;
  const hash = req.body.password;
  User.findOne({ email: req.body.email })
    .then((user): any => {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Auth failed! Check your email and password.'
        });
      };
      fetchedUser = user;
      return bcrypt.compare(req.body.password, hash);
    })
    .then((err: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: req.body.email, userId: fetchedUser._id },
        secret.jwtSecret,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        userId: fetchedUser._id,
        token: token,
        expiresIn: 3600
      });
    })
    .catch((err: any) => {
      res.status(500).json({
        success: false,
        message: 'Invalid authentication credentials!'
      });
    });
};
