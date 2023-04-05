import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../interface/user.interface";
import { writeFile, readFile } from "fs";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import { checkErrors, emailUnique } from "../middleware/validation.middleware";
import { userDB } from "../app";
const routes = express.Router();

routes.use(express.json());

const saltRounds = Number(process.env.SALT_ROUND);

routes.post(
  "/",
  body("email").isEmail(),
  body("name").notEmpty(),
  body("surname").notEmpty(),
  body("password").isLength({ min: 8 }).notEmpty(),
  checkErrors,
  (req: Request, res: Response, next: NextFunction) => {
    const user = userDB.find(({ email }) => email === req.body.email);
    if (user) {
      return res.status(409).json({ message: "Email is just present" });
    }
    next();
  },
  async ({ body }: Request, res: Response) => {
    readFile(String(process.env.DB), "utf8", (err) => {
      if (err) {
        console.error(err);
        return 1;
      }
    });

    const user = {
      id: uuidv4(),
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: await bcrypt.hash(body.password, saltRounds),
      verify: uuidv4(),
    };

    userDB.push(user);

    writeFile(
      String(process.env.DB),
      JSON.stringify(userDB, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
        res.status(201).json({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        });
      }
    );
  }
);

export default routes;
