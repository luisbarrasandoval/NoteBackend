import HttpException from "./HttpException";

class TheUsernameAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(400, `The username ${username} already exists`);
  }
}

export default TheUsernameAlreadyExistsException;