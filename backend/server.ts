import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books";

const app = express();
const PORT = 8000;

//middleWare
app.use(cors());
app.use(express.json());

//routes
app.use("/api/books", bookRoutes);

//start Server
app.listen(PORT, () => {
  console.log(`Server Start ! http://localhost${PORT}`);
});
