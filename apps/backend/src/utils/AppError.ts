export interface AppErrorArgs {
  name?: string;
  httpCode: number;
  message: string;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
