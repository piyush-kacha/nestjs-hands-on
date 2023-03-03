import { HttpException, HttpStatus } from '@nestjs/common';
import { IException } from './exceptions.interface';
import { ExceptionConstants } from './exceptions.constants';

export class InternalServerErrorException extends HttpException {
  code: number;
  cause: Error;
  description: string;
  message: string;
  constructor(exception: IException) {
    super(exception.message, HttpStatus.INTERNAL_SERVER_ERROR, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  static INTERNAL_SERVER_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message:
        'We are sorry, something went wrong on our end. Please try again later or contact our support team for assistance.',
      code: ExceptionConstants.InternalServerErrorCodes.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  };

  static UNEXPECTED_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message: 'An unexpected error occurred while processing the request.',
      code: ExceptionConstants.InternalServerErrorCodes.UNEXPECTED_ERROR,
      cause: error,
    });
  };
}
