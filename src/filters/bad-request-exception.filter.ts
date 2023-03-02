import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { BadRequestException } from '../exceptions/bad-request.exception';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestException.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    this.logger.verbose(exception);

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus();

    // Example of fetching path to attach path inside response object
    const request = ctx.getRequest();
    // const path = httpAdapter.getRequestUrl(request);

    const responseBody = {
      error: exception.code,
      message: exception.getResponse(),
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
