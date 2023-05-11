import { randomUUID } from 'crypto';

interface PasswordConstructorParameters {
  username: string;
  password: string;
  description: string;
  userId: number;
  categoryId: number;
}

class Password {
  readonly id: string;
  username: string;
  password: string;
  description: string;
  userId: number;
  categoryId: number;
  readonly createdAt: Date;

  constructor(params: PasswordConstructorParameters) {
    this.id = randomUUID();
    this.username = params.username;
    this.password = params.password;
    this.description = params.description;
    this.userId = params.userId;
    this.categoryId = params.categoryId;
    this.createdAt = new Date();
  }
}

export default Password;
