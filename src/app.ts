import app from "./config/app";
import { connectDB } from "./config/database";
import {
  ErrorMiddleware,
  wildCardMiddleware,
} from "./middleware/error-middleware";
import blogRoutes from "./routes/blog-routes";
import userRoutes from "./routes/user-routes";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

connectDB();

app.use("/", userRoutes);
app.use("/blogs", blogRoutes);

app.use("*", wildCardMiddleware);
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port: http://${HOST}:${PORT}`);
});
