import express, { Application } from 'express';

import userRoutes from './Routes/users';
import { decode } from 'base-64';

const app: Application = express();

app.use(express.json());
app.use('/user', userRoutes);
app.listen(8000, () => console.log(decode('cGFzc3dvcmQxMjM=')));
