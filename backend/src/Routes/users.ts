import { Router } from 'express';

import { login, register } from '../Controllers/UserController';

const userRoutes: Router = Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);

export default userRoutes;
