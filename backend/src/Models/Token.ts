import { randomUUID } from 'crypto';

class Token {
  readonly id;
  readonly token: string;
  userId: string;
  createdAt: Date;

  constructor(userId: string) {
    this.id = randomUUID();
    this.token = randomUUID();
    this.userId = userId;
    this.createdAt = new Date();
  }
}

export default Token;
