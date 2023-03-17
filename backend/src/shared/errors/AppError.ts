export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;
  public readonly data: Object;

  constructor(message: string, statusCode = 400, data = {}) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
