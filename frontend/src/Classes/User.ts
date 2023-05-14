interface UserConstructorParams {
  readonly id: string;
  username: string;
  token: string;
}

class User {
  readonly id;
  username: string;
  token: string;

  constructor(params: UserConstructorParams) {
    this.id = params.id;
    this.username = params.username;
    this.token = params.token;
  }
}

export default User;
