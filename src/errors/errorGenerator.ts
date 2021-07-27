const DEFAULT_HTTP_STATUS_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorGenerator = ({ msg = '', statusCode = 500 }: { msg?: string; statusCode: number }): void => {
  const err: ErrorWithStatusCode = new Error(msg || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]);
  err.statusCode = statusCode;
  throw err;
};

export default errorGenerator;
