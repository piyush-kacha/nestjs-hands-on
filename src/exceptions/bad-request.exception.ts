import { HttpException, HttpStatus } from '@nestjs/common';
import { IException } from './exceptions.interface';
import { ExceptionConstants } from './exceptions.constants';

export class BadRequestException extends HttpException {
  code: number;
  cause: Error;
  description: string;
  message: string;
  constructor(exception: IException) {
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
      code: ExceptionConstants.BadRequestCodes.HTTP_REQUEST_TIMEOUT,
    });
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Validation Error',
      code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
    });
  };

  static UNEXPECTED = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Unexpected Error',
      code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
    });
  };
}
