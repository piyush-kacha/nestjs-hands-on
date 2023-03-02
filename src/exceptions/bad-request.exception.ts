import { HttpException, HttpStatus } from '@nestjs/common';

interface IBadRequestException {
  message: string;
  code?: number;
  cause?: Error;
  description?: string;
}

export class BadRequestException extends HttpException {
  code: number;
  cause: Error;
  description: string;
  message: string;
  constructor(exception: IBadRequestException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  static HTTP_REQUEST_TIMEOUT = () => {
    return new BadRequestException({
      message: 'HTTP Request Timeout',
      code: 10001,
    });
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Validation Error',
      code: 10002,
    });
  };

  static UNEXPECTED = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Unexpected Error',
      code: 10003,
    });
  };
}
