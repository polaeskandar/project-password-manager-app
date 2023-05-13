import { randomUUID } from "crypto";

class Category {
  readonly id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt?: Date;

  constructor(name: string, description: string, userId: string) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.createdAt = new Date();
  }
}

export default Category;
