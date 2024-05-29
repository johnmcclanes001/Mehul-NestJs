import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    /* Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    ); */

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case QueryFailedError: // this is a TypeOrm error
        //status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = this.getDatabaseError((exception as QueryFailedError));
        code = (exception as any).code;        
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        //status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        //status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }

  getDatabaseError(exception){
    console.log("exception :" , exception.code);
    switch (exception.code) {
      case "ER_DUP_ENTRY":
          return "Record is already exists."
        break;    
      default:
        return "Something went wrong."
        break;
    }
  }

}

export const GlobalResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};

export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}
