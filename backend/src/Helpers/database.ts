import path from "path";
import { readFileSync, writeFileSync } from "fs";

import { getProjectPath } from "./file";
import Databases from "../Enums/databases";

export const getDatabasePath = (databaseName: Databases): string => {
  return path.join(getProjectPath(), "src", "Data", databaseName);
};

export const getDatabase = <Type>(databaseName: Databases, filterFunction?: (key: Type, index?: number, array?: Array<Type>) => boolean): Array<Type> => {
  const usersDatabasePath = getDatabasePath(databaseName);

  const JSONFormat = JSON.parse(readFileSync(usersDatabasePath) as unknown as string);

  if (filterFunction) return JSONFormat.filter(filterFunction);
  else return JSONFormat;
};

export const checkEntryExistence = <Type>(databaseName: Databases, findFunction: (key: Type, index?: number, obj?: Array<Type>) => boolean): Type | undefined => {
  const database: Array<Type> = getDatabase(databaseName);
  return database.find(findFunction);
};

export const addToDatabase = <Type>(databaseName: Databases, value: Type, filterFunction?: (key: Type, index?: number, array?: Array<Type>) => boolean): Type => {
  let database: Array<Type> = getDatabase(databaseName);
  if (filterFunction) database = database.filter(filterFunction);

  database.push(value);
  writeFileSync(getDatabasePath(databaseName), JSON.stringify(database), {
    encoding: "utf8",
  });

  return value;
};

export const setDatabase = <Type>(databaseName: Databases, values: Array<Type>): void => {
  const databasePath: string = getDatabasePath(databaseName);
  writeFileSync(databasePath, JSON.stringify(values), { encoding: "utf8" });
};
