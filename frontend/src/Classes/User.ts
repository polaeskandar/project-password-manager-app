interface UserConstructorParams {
  readonly id: string;
  username: string;
  token: string;
  password: string;
}

class User {
  readonly id;
  username: string;
  token: string;
  password?: string;

  constructor(params: UserConstructorParams) {
    this.id = params.id;
    this.username = params.username;
    this.token = params.token;
    this.password = params.password;
  }
}

export default User;
