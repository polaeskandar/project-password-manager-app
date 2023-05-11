import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { Request, Response } from 'express';
import { decode, encode } from 'base-64';

import { getProjectPath } from '../Helpers/file';
import User from '../Models/User';
import Token from '../Models/Token';

//*** IMPORTANT: Some parts of this code are absolutely not efficient, just there for the sake of time...
//*** One possible improvement could be using JWT library instead of manually managing auth tokens.
//*** Another possible improvement could be using a DMS (Mongodb, MySQL, PostgreSQL...) instead of using filesystem to store data.

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usersDatabasePath = path.join(
    getProjectPath(),
    'src',
    'Data',
    'users.json'
  );

  const users: Array<User> = JSON.parse(
    readFileSync(usersDatabasePath) as unknown as string
  );

  for (const user of users) {
    if (user.username === username && decode(user.password) === password) {
      res.status(200).send({
        msg: 'User found!',
        user: {
          id: user.id,
          username: user.username,
          created_at: user.createdAt,
        },
        token: createToken(user.id),
      });

      return;
    }
  }

  res.status(404).send({ msg: 'User not found!' });
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usersDatabasePath = path.join(
    getProjectPath(),
    'src',
    'Data',
    'users.json'
  );

  const users: Array<User> = JSON.parse(
    readFileSync(usersDatabasePath) as unknown as string
  );

  for (const user of users) {
    if (user.username === username) {
      res.status(400).send({ msg: 'User already exits! please login.' });
      return;
    }
  }

  const newUser = new User(username, encode(password));
  users.push(newUser);
  writeFileSync(usersDatabasePath, JSON.stringify(users), { encoding: 'utf8' });

  res.status(201).send({
    msg: 'User registered successfully!',
    user: { id: newUser.id, username: username, created_at: newUser.createdAt },
    token: createToken(newUser.id),
  });
};

const createToken = (userId: string): Token => {
  const tokensDatabasePath = path.join(
    getProjectPath(),
    'src',
    'Data',
    'tokens.json'
  );

  let allTokens: Array<Token> = JSON.parse(
    readFileSync(tokensDatabasePath) as unknown as string
  ).filter((token: Token) => token.userId !== userId);

  const token = new Token(userId);
  allTokens.push(token);

  writeFileSync(tokensDatabasePath, JSON.stringify(allTokens), {
    encoding: 'utf8',
  });

  return token;
};
