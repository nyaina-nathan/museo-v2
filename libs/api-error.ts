export interface ApiErrorOptions {
  title: string;
  message: string;
  status: number;
  origin?: string;
  details?: unknown;
}

export class ApiError extends Error {
  readonly title: string;
  readonly status: number;
  readonly origin?: string;
  readonly details?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.title = options.title;
    this.status = options.status;
    this.origin = options.origin;
    this.details = options.details;
  }
}