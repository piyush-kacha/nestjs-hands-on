import * as crypto from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';
import { Params } from 'nestjs-pino';
import { RequestMethod } from '@nestjs/common';

enum NodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}
enum LogLevel {
  SILENT = 'silent',
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export class AppConfig {
  public static getLoggerConfig(): Params {
    const { BASE_PATH, CLUSTERING, LOG_LEVEL, NODE_ENV } = process.env;

    return {
      // Exclude may not work for e2e testing
      exclude: [],
      pinoHttp: {
        genReqId: () => crypto.randomUUID(),
        autoLogging: true,
        // base: CLUSTERING === 'true' ? { pid: process.pid } : {},
        customAttributeKeys: {
          responseTime: 'timeSpent',
        },
        level:
          LOG_LEVEL ||
          (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
              id: request.id,
              // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
              // headers: request.headers,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        transport:
          NODE_ENV !== NodeEnv.PRODUCTION
            ? {
                target: 'pino-pretty',
                options: {
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                },
              }
            : null,
      },
    };
  }
}
