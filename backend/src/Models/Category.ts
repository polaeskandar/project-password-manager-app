import { randomUUID } from "crypto";

interface CategoryConstructorParams {
  id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt?: Date;
}

class Category {
  readonly id;
  name: string;
  description: string;
  userId: string;
  readonly createdAt: Date;

  constructor(params: CategoryConstructorParams) {
    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.userId = params.userId;
    this.createdAt = new Date();
  }
}

export default Category;
