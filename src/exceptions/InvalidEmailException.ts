import HttpException from "./HttpException";

class InvalidEmailException extends HttpException {
  constructor(email: string) {
    super(400, `El email ${email} no es valido`);
  }
}

export default InvalidEmailException;