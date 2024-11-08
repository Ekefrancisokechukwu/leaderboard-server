import CustomeError from "./customError";

class BadRequestError extends CustomeError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
