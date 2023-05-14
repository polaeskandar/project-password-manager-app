import { randomUUID } from "crypto";

interface PasswordConstructorParams {
  readonly id?: string;
  application: string;
  description: string;
  username: string;
  password: string;
  userId: string;
  categoryId: string;
  createdAt?: Date;
}

class Password {
  readonly id?: string;
  application: string;
  description: string;
  username: string;
  password: string;
  userId: string;
  categoryId: string;
  createdAt?: Date;

  constructor(params: PasswordConstructorParams) {
    this.id = params.id ?? randomUUID();
    this.application = params.application;
    this.description = params.description;
    this.username = params.username;
    this.password = params.password;
    this.userId = params.userId;
    this.categoryId = params.categoryId;
    this.createdAt = params.createdAt ?? new Date();
  }
}

export default Password;
