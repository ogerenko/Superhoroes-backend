import express from "express";
import cors from "cors";
import heroRoutes from "./routes/heroRoutes";
import indexRoutes from "./routes/indexRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // для обработки запросов JSON-tel

app.use("/", indexRoutes);
app.use('/heroes', heroRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
