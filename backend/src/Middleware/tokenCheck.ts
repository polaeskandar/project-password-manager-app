import { NextFunction, Request, Response } from "express";

import { getDatabase } from "../Helpers/database";
import Token from "../Models/Token";
import Databases from "../Enums/databases";

export const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) return res.status(401).send("Unauthorized!");

  const sentToken = authorization.split(" ")[1];
  const user_id = req.body.user_id || req.headers["x-user-id"];

  const tokensDatabase: Array<Token> = getDatabase(Databases.TOKENS);
  let foundToken = false;

  for (const token of tokensDatabase) {
    if (token.token === sentToken && token.userId === user_id) {
      foundToken = true;
      break;
    }
  }

  if (foundToken) next();
  else res.status(401).send("Unauthorized!");
};
