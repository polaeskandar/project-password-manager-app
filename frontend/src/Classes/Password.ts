class Password {
  readonly id: string;
  categoryId: string;
  application: string;
  description: string;
  userName: string;
  encryptedPassword: string;
  userId: string;
  createdAt: Date;

  constructor(id: string, categoryId: string, application: string, description: string, userName: string, encryptedPassword: string, userId: string, createdAt: Date) {
    this.id = id;
    this.categoryId = categoryId;
    this.application = application;
    this.description = description;
    this.userName = userName;
    this.encryptedPassword = encryptedPassword;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

export default Password;
