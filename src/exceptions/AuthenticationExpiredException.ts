import HttpException from "./HttpException";

class AuthenticationExpired extends HttpException {
  constructor() {
    super(401, `Authentication expired`);
  }
}
export default AuthenticationExpired;