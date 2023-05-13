import { Router } from "express";

import { getCategory, createCategory, editCategory, deleteCategory } from "../Controllers/CategoriesController";
import { tokenCheck } from "../Middleware/tokenCheck";

const categoryRoutes: Router = Router();

categoryRoutes.get("/:userId", getCategory);
categoryRoutes.post("/", tokenCheck, createCategory);
categoryRoutes.patch("/:id", tokenCheck, editCategory);
categoryRoutes.delete("/:id", tokenCheck, deleteCategory);

export default categoryRoutes;
