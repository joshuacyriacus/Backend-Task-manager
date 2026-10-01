import express from "express"
import { taskRouter } from "./routes/task.route";
import { errorHandler } from "./middleware/errorHandler";
import { getUrlandHttp } from "./middleware/logger.middleware";

const app = express();
const PORT = 4444;

app.use(express.json())

app.use("/api", taskRouter)


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});