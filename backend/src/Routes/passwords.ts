import { Router } from "express";

import { getPasswords, createPasswords, editPasswords, deletePasswords } from "../Controllers/PasswordsController";
import { tokenCheck } from "../Middleware/tokenCheck";

const passwordRoutes: Router = Router();

passwordRoutes.get("/:userId", getPasswords);
passwordRoutes.post("/", tokenCheck, createPasswords);
passwordRoutes.patch("/:id", tokenCheck, editPasswords);
passwordRoutes.delete("/:id", tokenCheck, deletePasswords);

export default passwordRoutes;
