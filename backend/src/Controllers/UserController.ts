import { Request, Response } from 'express';
import { decode, encode } from 'base-64';

import User from '../Models/User';
import Token from '../Models/Token';
import { addToDatabase, checkEntryExistence } from '../Helpers/database';
import Databases from '../Enums/databases';

//*** IMPORTANT: Some parts of this code are absolutely not efficient, just there for the sake of time...
//*** One possible improvement could be using JWT library instead of manually managing auth tokens.
//*** Another possible improvement could be using a DMS (Mongodb, MySQL, PostgreSQL...) instead of using filesystem to store data.

export const checkUserExistence = (username: string): User | undefined => {
  return checkEntryExistence(
    Databases.USERS,
    (user: User) => user.username === username
  );
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user: User | undefined = checkUserExistence(username);

  if (!user) return res.status(404).send({ msg: 'User not found!' });
  if (!decode(user.password) === password) {
    return res.status(400).send({ msg: 'Wrong password!' });
  }

  const { token } = createToken(user.id);

  return res.status(200).send({
    msg: 'User found!',
    user: { id: user.id, username: user.username, created_at: user.createdAt },
    token,
  });
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user: User | undefined = checkUserExistence(username);

  if (user) return res.status(400).send({ msg: 'User found! please login.' });

  const newUser = new User(username, encode(password));
  addToDatabase(Databases.USERS, newUser);
  const { token } = createToken(newUser.id);

  res.status(201).send({
    msg: 'User registered successfully!',
    user: { id: newUser.id, username: username, created_at: newUser.createdAt },
    token,
  });
};

const createToken = (userId: string): Token => {
  const token: Token = new Token(userId);
  return addToDatabase(
    Databases.TOKENS,
    token,
    (token: Token) => token.userId !== userId
  );
};
