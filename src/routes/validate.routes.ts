import express, { Request, Response } from "express";
import { writeFile, readFile } from "fs";
import { userDB } from "../app";
const routes = express.Router();

routes.use(express.json());

routes.get("/:tokenVerify", (req: Request, res: Response) => {
  const user = userDB.find((item) => item.verify === req.params.tokenVerify);
  if (user) {
    delete user.verify;
    writeFile(
      String(process.env.DB),
      JSON.stringify(userDB, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ message: "User enabled" });
      }
    );
  } else {
    res.status(400).json({ message: "token not valid" });
  }
});

export default routes;
