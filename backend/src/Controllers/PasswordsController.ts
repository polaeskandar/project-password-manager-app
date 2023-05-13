import { Request, Response } from "express";

import Databases from "../Enums/databases";
import { addToDatabase, checkEntryExistence, getDatabase, setDatabase } from "../Helpers/database";
import Password from "../Models/Password";

const checkPasswordExistence = (app: string, userId: string): Password | undefined => {
  return checkEntryExistence(Databases.USERS, (password: Password) => password.application === app && password.userId === userId);
};

export const getPassword = (req: Request, res: Response) => {
  const { user_id } = req.body;
  const passwords = getDatabase(Databases.PASSWORDS, (password: Password) => password.userId === user_id);

  res.status(200).send({
    msg: `${passwords.length} passwords found!`,
    passwords,
  });
};

export const createPassword = (req: Request, res: Response) => {
  const { application, username, password, description, category_id, user_id } = req.body;
  const passwordExists = checkPasswordExistence(application, user_id);

  if (passwordExists) {
    return res.status(400).send({ msg: "Password already exists for the user." });
  }

  const newPassword = new Password({ username, application, password, description, categoryId: category_id, userId: user_id });
  addToDatabase(Databases.PASSWORDS, newPassword);

  res.status(201).send({
    msg: "Password created successfully!",
    password: newPassword,
  });
};

export const editPassword = (req: Request, res: Response) => {
  const { id } = req.params;
  const { application, username, password, description, category_id, user_id } = req.body;

  let allPasswords: Array<Password> = getDatabase(Databases.PASSWORDS);
  const shouldBeEdited: Password | undefined = allPasswords.find((password) => password.id === id && password.userId === user_id);
  if (!shouldBeEdited) return res.status(404).send({ msg: "Password not found!" });

  allPasswords = allPasswords.map((passwordItem) => {
    if (passwordItem.id === id && passwordItem.userId === user_id) {
      passwordItem.application = application;
      passwordItem.username = username;
      passwordItem.password = password;
      passwordItem.description = description;
      passwordItem.categoryId = category_id;
    }

    return passwordItem;
  });

  setDatabase(Databases.PASSWORDS, allPasswords);

  res.status(200).send({
    msg: "Password Edited successfully",
    passwords: allPasswords.filter((password) => password.userId === user_id),
  });
};

export const deletePassword = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;

  let allPasswords: Array<Password> = getDatabase(Databases.PASSWORDS);
  const shouldBeDeleted: Password | undefined = allPasswords.find((password) => password.id === id && password.userId === user_id);
  if (!shouldBeDeleted) return res.status(404).send({ msg: "Password not found!" });

  allPasswords = allPasswords.filter((password) => password.id !== id && password.userId !== user_id);
  setDatabase(Databases.PASSWORDS, allPasswords);

  res.status(204).send({});
};
