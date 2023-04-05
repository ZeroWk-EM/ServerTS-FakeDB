import express, { Request, Response } from "express";
const routes = express.Router();
import { body } from "express-validator";
import { checkErrors } from "../middleware/validation.middleware";
import { userDB } from "../app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secretKey=String(process.env.SECRET_JWT)
routes.use(express.json());

routes.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }).notEmpty(),
  checkErrors,
  async (req, res) => {
    const user = userDB.find((item) => item.email === req.body.email);
    if (
      user &&
      !user.verify &&
      (await bcrypt.compare(req.body.password, user.password!))
    ) {
      res.json({ token: jwt.sign(user, secretKey) });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
);

export default routes;
