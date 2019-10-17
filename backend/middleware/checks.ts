import { Request, Response, NextFunction } from "express";
import { HTTPS400Error } from "../utils/httpsErrors";

export const checkUserCreate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new HTTPS400Error("Pass email and password");
  } else {
    next();
  }
}

