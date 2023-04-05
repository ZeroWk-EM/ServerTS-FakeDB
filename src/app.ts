// Import dependance
import express from "express";
import dotenv from "dotenv";
import { User } from "./interface/user.interface";


dotenv.config();

// Variable
const port = process.env.PORT;
const app = express();

export const userDB: User[] = [];

// Import routes
import login from "./routes/login.routes"
import me from "./routes/me.routes"
import signup from "./routes/signup.routes"
import user from "./routes/user.routes"
import validate from "./routes/validate.routes"

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ server_status: 200, message: "Welcome to ServerTS-FakeDB" });
});

app.use("/login",login)
app.use("/me",me)
app.use("/signup",signup)
app.use("/users",user)
app.use("/validate",validate)

app.listen(port, () => {
  console.log(`Server is started in [${port}] port`);
});

export default app