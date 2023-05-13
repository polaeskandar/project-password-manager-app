class Category {
  readonly id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;

  constructor(id: string, name: string, description: string, userId: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

export default Category;
