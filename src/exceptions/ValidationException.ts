import HttpException from "./HttpException";

class ValidationException extends HttpException {
  constructor(messages: Array<{propery: string,  message: string}>) {
    super(422, "validation error");
    this.messages = messages;
  }
}

export default ValidationException;