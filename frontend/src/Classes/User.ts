class User {
  readonly id;
  username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}

export default User;
