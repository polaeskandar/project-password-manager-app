import { randomUUID } from "crypto";

interface PasswordConstructorParameters {
  id?: string;
  application: string;
  username: string;
  password: string;
  description: string;
  categoryId: string;
  userId: string;
}

class Password {
  readonly id?: string;
  application: string;
  username: string;
  password: string;
  description: string;
  categoryId: string;
  readonly userId: string;
  readonly createdAt: Date;

  constructor(params: PasswordConstructorParameters) {
    this.id = params.id ?? randomUUID();
    this.username = params.username;
    this.password = params.password;
    this.description = params.description;
    this.application = params.application;
    this.userId = params.userId;
    this.categoryId = params.categoryId;
    this.createdAt = new Date();
  }
}

export default Password;
