import { Request, Response } from "express";

import Databases from "../Enums/databases";
import { addToDatabase, checkEntryExistence, getDatabase, setDatabase } from "../Helpers/database";
import Category from "../Models/Category";

const checkCategoryExistence = (name: string, userId: string): Category | undefined => {
  return checkEntryExistence(
    Databases.USERS,
    (category: Category) => category.name === name && category.userId === userId
  );
};

export const getCategory = (req: Request, res: Response) => {
  const { userId } = req.params;
  const categories = getDatabase(Databases.CATEGORIES, (category: Category) => category.userId === userId);

  res.status(200).send({
    msg: `${categories.length} categories found!`,
    categories,
  });
};

export const createCategory = (req: Request, res: Response) => {
  const { name, description, user_id } = req.body;
  const category = checkCategoryExistence(name, user_id);

  if (category) {
    return res.status(400).send({ msg: "Category already exists for the user." });
  }

  const newCategory = new Category({ name, description, userId: user_id });
  addToDatabase(Databases.CATEGORIES, newCategory);

  res.status(201).send({
    msg: "Category created successfully!",
    category: {
      id: newCategory.id,
      name: newCategory.name,
      description: newCategory.description,
      created_at: newCategory.createdAt,
    },
  });
};

export const editCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, user_id } = req.body;

  let allCategories: Array<Category> = getDatabase(Databases.CATEGORIES);
  const shouldBeEdited: Category | undefined = allCategories.find(
    (category) => category.id === id && category.userId === user_id
  );

  if (!shouldBeEdited) return res.status(404).send({ msg: "Category not found!" });

  allCategories = allCategories.map((category) => {
    if (category.id === id && category.userId === user_id) {
      category.name = name;
      category.description = description;
    }

    return category;
  });

  setDatabase(Databases.CATEGORIES, allCategories);

  res.status(200).send({
    msg: "Category Edited successfully",
    categories: allCategories.filter((category) => category.userId === user_id),
  });
};

export const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.body.user_id || req.headers["x-user-id"];

  let allCategories: Array<Category> = getDatabase(Databases.CATEGORIES);
  const shouldBeDeleted: Category | undefined = allCategories.find(
    (category) => category.id === id && category.userId === user_id
  );

  if (!shouldBeDeleted) return res.status(404).send({ msg: "Category not found!" });
  allCategories = allCategories.filter(
    (category) => category.userId !== user_id || (category.userId === user_id && category.id !== id)
  );

  setDatabase(Databases.CATEGORIES, allCategories);
  res.status(204).send({});
};
