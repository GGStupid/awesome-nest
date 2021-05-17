import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: string;
  message: string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorResponse = exception.getResponse();
    let status, errMsg;
    if (typeof errorResponse === 'string') {
      status = exception.getStatus();
      errMsg = exception.message;
    } else {
      status = (errorResponse as ErrorResponse).statusCode;
      errMsg = (errorResponse as ErrorResponse).message;
    }

    response.json({
      code: status,
      message: errMsg,
      timestamp: new Date().getTime(),
      requestUrl: request.url,
      requestParmas: request.params,
      requestBody: request.body,
    });
  }
}
