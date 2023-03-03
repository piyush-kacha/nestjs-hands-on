import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    this.logger.warn(exception);

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
      description: exception.description,
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
