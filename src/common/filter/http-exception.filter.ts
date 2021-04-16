import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errMsg = exception.message;

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
