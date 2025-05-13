export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public context?: any;

  constructor(
    message: string,
    statusCode = 500,
    isOperational = true,
    context?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}
