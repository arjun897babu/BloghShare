import app from "./config/app";
import { connectDB } from "./config/database";
import { ErrorMiddleware } from "./middleware/error-middleware";
import userRoutes from "./routes/user-routes";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

connectDB();

app.use('/',userRoutes)

app.use(ErrorMiddleware);

app.listen(PORT, () => {
console.log(`server is running on port: http://${HOST}:${PORT}`);
});
