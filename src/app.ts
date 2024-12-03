import app from "./config/App";
import { connectDB } from "./config/database";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port: http://${HOST}:${PORT}`);
});
