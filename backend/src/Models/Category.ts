import { randomUUID } from 'crypto';

interface CategoryConstructorParams {
  name: string;
  description: string;
  userId: number;
}

class Category {
  readonly id;
  name: string;
  description: string;
  userId: number;
  readonly createdAt: Date;

  constructor(params: CategoryConstructorParams) {
    this.id = randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.userId = params.userId;
    this.createdAt = new Date();
  }
}

export default Category;
