class Category {
  readonly id;
  name: string;
  description: string;
  userId: number;

  constructor(id: number, name: string, description: string, userId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
  }
}

export default Category;
