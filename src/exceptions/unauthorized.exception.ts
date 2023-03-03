import { HttpException, HttpStatus } from '@nestjs/common';
import { IException } from './exceptions.interface';
import { ExceptionConstants } from './exceptions.constants';

export class UnauthorizedException extends HttpException {
  code: number;
  cause: Error;
  description: string;
  message: string;
  constructor(exception: IException) {
    super(exception.message, HttpStatus.UNAUTHORIZED, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  static TOKEN_EXPIRED_ERROR = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'The authentication token provided has expired.',
      code: ExceptionConstants.UnauthorizedCodes.TOKEN_EXPIRED_ERROR,
    });
  };

  static JSON_WEB_TOKEN_ERROR = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'Invalid token specified.',
      code: ExceptionConstants.UnauthorizedCodes.JSON_WEB_TOKEN_ERROR,
    });
  };

  static UNAUTHORIZED_ACCESS = (description?: string) => {
    return new UnauthorizedException({
      message: 'Access to the requested resource is unauthorized.',
      code: ExceptionConstants.UnauthorizedCodes.UNAUTHORIZED_ACCESS,
      description,
    });
  };

  static UNEXPECTED_ERROR = (error: any) => {
    return new UnauthorizedException({
      message:
        'An unexpected error occurred while processing the request. Please try again later.',
      code: ExceptionConstants.UnauthorizedCodes.UNEXPECTED_ERROR,
      cause: error,
    });
  };
}
