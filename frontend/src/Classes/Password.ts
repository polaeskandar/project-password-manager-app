class Password {
  readonly id: number;
  categoryId: number;
  app: string;
  description: string;
  userName: string;
  encryptedPassword: string;
  userId: number;
  createdAt: Date;

  constructor(id: number, categoryId: number, app: string, description: string, userName: string, encryptedPassword: string, userId: number, createdAt: Date) {
    this.id = id;
    this.categoryId = categoryId;
    this.app = app;
    this.description = description;
    this.userName = userName;
    this.encryptedPassword = encryptedPassword;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

export default Password;
