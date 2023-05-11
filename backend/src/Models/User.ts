import { randomUUID } from 'crypto';

class User {
  readonly id: string;
  username: string;
  password: string;
  createdAt: Date;

  constructor(username: string, password: string) {
    this.id = randomUUID();
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
  }
}

export default User;
