import { randomUUID } from "crypto";

interface CategoryConstructorParams {
  readonly id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt?: Date;
}

class Category {
  readonly id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt?: Date;

  constructor(params: CategoryConstructorParams) {
    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.userId = params.userId;
    this.createdAt = params.createdAt ?? new Date();
  }
}

export default Category;
