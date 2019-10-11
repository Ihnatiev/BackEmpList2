import { Request, Response, NextFunction } from "express";
import { HTTPS400Error } from "../utils/httpsErrors";

export const checkSearchParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.q) {
    throw new HTTPS400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkUserCreate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new HTTPS400Error("Pass email and password");
  } else {
    next();
  }
}