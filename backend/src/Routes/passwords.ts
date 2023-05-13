import { Router } from "express";

import { getPassword, createPassword, editPassword, deletePassword } from "../Controllers/PasswordsController";
import { tokenCheck } from "../Middleware/tokenCheck";

const passwordRoutes: Router = Router();

passwordRoutes.get("/", tokenCheck, getPassword);
passwordRoutes.post("/", tokenCheck, createPassword);
passwordRoutes.patch("/:id", tokenCheck, editPassword);
passwordRoutes.delete("/:id", tokenCheck, deletePassword);

export default passwordRoutes;
