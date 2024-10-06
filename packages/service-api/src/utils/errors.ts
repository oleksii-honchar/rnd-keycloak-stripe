class ErrorWithData extends Error {
  constructor(
    message?: string,
    public data?: unknown,
  ) {
    super(message);
  }
}

export class HttpError extends ErrorWithData {
  constructor(
    public statusCode: number, // fastify natively supports statusCode
    message: string,
    data?: unknown,
  ) {
    super(message, data);
    this.name = 'HttpError';
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(409, message, data);
    this.name = 'ConflictError';
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(400, message, data);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(401, message, data);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(404, message, data);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(500, message, data);
    this.name = 'InternalServerError';
  }
}
