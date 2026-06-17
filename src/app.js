import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { API_PREFIX } from "./constant.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); // limit the size of the request body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // limit the size of the request body
app.use(express.static("public")); // serve static files from the public directory
app.use(cookieParser()); // parse the cookie header and populate req.cookies with an object keyed by the cookie names.

app.get("/", (req, res) => {
  console.log("request received");
  res.send("Hello World");
});

// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
app.use(`${API_PREFIX}/user`, userRouter);

export default app;
