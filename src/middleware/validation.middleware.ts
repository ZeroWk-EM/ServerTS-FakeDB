import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import users from "../database/userDB.json";

export const checkErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const emailUnique = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = users.find(({ email }) => email === req.body.email);
  if (user) {
    return res.status(409).json({ message: "Email is just present" });
  }
  next();
};
