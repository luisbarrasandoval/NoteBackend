class HttpException extends Error {

  public status: number;
  public messages!: Array<{
    propery: string,
    message: string
  }>

  constructor(status: number, message: string) {
    super(message)
    this.status = status;
  }

}

export default HttpException;