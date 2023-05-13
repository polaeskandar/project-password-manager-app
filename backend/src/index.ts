import express, { Application } from "express";

import userRoutes from "./Routes/users";
import categoryRoutes from "./Routes/categories";
import passwordRoutes from "./Routes/passwords";

const app: Application = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/password", passwordRoutes);
app.listen(8000, () => console.log("Running on port 8000"));
