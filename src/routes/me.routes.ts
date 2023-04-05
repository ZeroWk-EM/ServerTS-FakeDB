import express, { Request, Response } from "express";
import { header } from "express-validator";
import { checkErrors } from "../middleware/validation.middleware";
import jwt from "jsonwebtoken";
import { userDB } from "../app";
import { User } from "../interface/user.interface";
import dotenv from "dotenv";

dotenv.config();

const secretKey = String(process.env.SECRET_JWT);
const routes = express.Router();

routes.use(express.json());

routes.get("/", header("authorization").isJWT(), checkErrors, (req, res) => {
  const auth = req.headers.authorization as string;
  const user = jwt.verify(auth, secretKey) as User;
  if (userDB.find((item) => item.email === user.email)) {
    delete user.password;
    res.json(user);
  } else {
    res.status(400).json({ message: "token not valid" });
  }
});

export default routes;
