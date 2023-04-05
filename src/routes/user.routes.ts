import express from "express";
import { userDB } from "../app";
const routes = express.Router();

routes.use(express.json());

routes.get("/", (req, res) => {
  res.status(200).json(userDB);
});
export default routes;
