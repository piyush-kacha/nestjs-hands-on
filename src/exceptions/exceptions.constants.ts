export class ExceptionConstants {
  public static readonly BadRequestCodes = {
    MISSING_REQUIRED_PARAMETER: 10001,
    INVALID_PARAMETER_VALUE: 10002,
    UNSUPPORTED_PARAMETER: 10003,
    INVALID_CONTENT_TYPE: 10004,
    INVALID_REQUEST_BODY: 10005,
    RESOURCE_ALREADY_EXISTS: 10006,
    RESOURCE_NOT_FOUND: 10007,
    REQUEST_TOO_LARGE: 10008,
    REQUEST_ENTITY_TOO_LARGE: 10009,
    REQUEST_URI_TOO_LONG: 10010,
    UNSUPPORTED_MEDIA_TYPE: 10011,
    METHOD_NOT_ALLOWED: 10012,
    HTTP_REQUEST_TIMEOUT: 10013,
    VALIDATION_ERROR: 10014,
    UNEXPECTED_ERROR: 10015,
  };
  public static readonly UnauthorizedCodes = {
    UNAUTHORIZED_ACCESS: 20001,
    INVALID_CREDENTIALS: 20002,
    JSON_WEB_TOKEN_ERROR: 20003,
    AUTHENTICATION_FAILED: 20004,
    ACCESS_TOKEN_EXPIRED: 20005,
    FORBIDDEN: 20006,
    TOKEN_EXPIRED_ERROR: 20007,
    UNEXPECTED_ERROR: 20008,
  };

  public static readonly InternalServerErrorCodes = {
    INTERNAL_SERVER_ERROR: 30001,
    DATABASE_ERROR: 30002,
    NETWORK_ERROR: 30003,
    THIRD_PARTY_SERVICE_ERROR: 30004,
    SERVER_OVERLOAD: 30005,
  };
}