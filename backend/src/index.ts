import express, { Application } from "express";
import cors from "cors";

import userRoutes from "./Routes/users";
import categoryRoutes from "./Routes/categories";
import passwordRoutes from "./Routes/passwords";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/passwords", passwordRoutes);
app.listen(8000, () => console.log("Running on port 8000"));
