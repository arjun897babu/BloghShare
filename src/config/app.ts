import express from "express";
import Cors from "cors";
import morgan from "morgan";

export const App = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.ORIGIN || "3000";

App.use(
  Cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

App.use(morgan("tiny"));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));


export default App