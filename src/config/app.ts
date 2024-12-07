import express from "express";
import Cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
export const App = express();

const ORIGIN = process.env.ORIGIN;
App.use(cookieParser());
App.use(
  Cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

App.use(morgan("tiny"));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

export default App;
